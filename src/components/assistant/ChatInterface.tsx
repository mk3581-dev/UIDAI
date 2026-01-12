import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQueries = [
  "How many enrolments were registered in Maharashtra?",
  "Top 5 states by enrolment",
  "What is Aadhaar and how does it work?",
  "Biometric failure rate in Karnataka",
  "How to update my Aadhaar address?",
  "What documents are required for Aadhaar?",
  "Give me a national enrolment summary",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chip-assistant`;

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to **Chip** – the Enrolment Intelligence Assistant.\n\nI can help you with:\n• **Enrolment statistics** — state-wise data, trends, success rates\n• **Aadhaar knowledge** — from basics to advanced topics\n• **Biometric analysis** — authentication rates, failure reasons\n• **General queries** — any question about Aadhaar ecosystem\n\nAsk me anything about Aadhaar or enrolment data!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = useCallback(async (
    conversationMessages: { role: "user" | "assistant"; content: string }[],
    onDelta: (text: string) => void,
    onDone: () => void,
    onError: (error: string) => void
  ) => {
    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: conversationMessages }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          onError("Rate limit exceeded. Please wait a moment and try again.");
          return;
        }
        if (response.status === 402) {
          onError("Service temporarily unavailable. Please try again later.");
          return;
        }
        const errorData = await response.json().catch(() => ({}));
        onError(errorData.error || "Failed to get response. Please try again.");
        return;
      }

      if (!response.body) {
        onError("No response received. Please try again.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) onDelta(content);
          } catch {
            // Incomplete JSON, put back and wait for more
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw || raw.startsWith(":") || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) onDelta(content);
          } catch { /* ignore */ }
        }
      }

      onDone();
    } catch (error) {
      console.error("Stream error:", error);
      onError("Connection error. Please check your network and try again.");
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const conversationHistory = messages
      .filter(m => m.id !== "welcome")
      .map(m => ({ role: m.role, content: m.content }));
    
    conversationHistory.push({ role: "user", content: input.trim() });

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.role === "assistant" && lastMessage.id !== "welcome") {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: assistantContent,
          timestamp: new Date(),
        }];
      });
    };

    await streamChat(
      conversationHistory,
      updateAssistant,
      () => setIsLoading(false),
      (error) => {
        setIsLoading(false);
        toast.error(error);
        // Remove the empty assistant message if there was an error
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && !last.content) {
            return prev.slice(0, -1);
          }
          return prev;
        });
      }
    );
  };

  const handleSuggestionClick = (query: string) => {
    setInput(query);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: "Welcome to **Chip** – the Enrolment Intelligence Assistant.\n\nI can help you with:\n• **Enrolment statistics** — state-wise data, trends, success rates\n• **Aadhaar knowledge** — from basics to advanced topics\n• **Biometric analysis** — authentication rates, failure reasons\n• **General queries** — any question about Aadhaar ecosystem\n\nAsk me anything about Aadhaar or enrolment data!",
      timestamp: new Date(),
    }]);
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        // Bold text
        line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Bullet points
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return `<div class="ml-4">${line}</div>`;
        }
        // Headers
        if (line.startsWith('## ')) {
          return `<h3 class="font-semibold text-base mt-3 mb-1">${line.slice(3)}</h3>`;
        }
        if (line.startsWith('# ')) {
          return `<h2 class="font-bold text-lg mt-3 mb-2">${line.slice(2)}</h2>`;
        }
        return line ? `<p>${line}</p>` : '<br/>';
      })
      .join('');
  };

  return (
    <div className="flex flex-col h-[650px] bg-card border rounded-lg overflow-hidden shadow-lg">
      {/* Chat Header */}
      <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">Chip – Enrolment Intelligence Assistant</h3>
            <p className="text-sm text-white/80">AI-powered • Verified datasets • Aadhaar expertise</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearChat}
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "animate-fade-in",
              message.role === "user" ? "flex justify-end" : ""
            )}
          >
            <div className="flex gap-3 max-w-[85%]">
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">
                  {message.role === "user" ? "Citizen Query" : "System Response"}
                </div>
                <div
                  className={cn(
                    message.role === "user" ? "chat-citizen" : "chat-system"
                  )}
                >
                  <div 
                    className="text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderContent(message.content) }}
                  />
                </div>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="chat-system flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing your query...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Queries */}
      <div className="px-6 py-3 border-t bg-muted/30">
        <p className="text-xs text-muted-foreground mb-2">Quick queries:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.slice(0, 5).map((query) => (
            <button
              key={query}
              onClick={() => handleSuggestionClick(query)}
              className="text-xs px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full transition-colors truncate max-w-[200px]"
              title={query}
            >
              {query.length > 30 ? query.slice(0, 30) + "..." : query}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-background">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask about Aadhaar, enrolments, or biometric data..."
            className="flex-1 px-4 py-3 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
            className="px-6"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
