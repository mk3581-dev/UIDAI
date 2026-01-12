import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  caption?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const StatCard = ({ 
  title, 
  value, 
  caption, 
  icon: Icon,
  trend,
  trendValue,
  className 
}: StatCardProps) => {
  return (
    <div className={cn("stat-card animate-fade-in", className)}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && (
          <div className="p-2 rounded-md bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
      
      <p className="text-3xl font-bold text-foreground mb-1">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
      
      {caption && (
        <p className="text-sm text-muted-foreground">{caption}</p>
      )}
      
      {trend && trendValue && (
        <div className="mt-3 flex items-center gap-1">
          <span className={cn(
            "text-sm font-medium",
            trend === "up" && "text-success",
            trend === "down" && "text-destructive",
            trend === "neutral" && "text-muted-foreground"
          )}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
          </span>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
