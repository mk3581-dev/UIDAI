import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Enrolment Dashboard", path: "/dashboard" },
  { label: "Analytics & Reports", path: "/analytics" },
  { label: "AI Assistant", path: "/assistant" },
  { label: "Data Sources", path: "/data-sources" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const GovNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="gov-nav">
      <div className="container mx-auto px-4 md:px-8">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "block px-4 py-3 text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-white/15 text-white"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center justify-between py-3">
          <span className="text-sm font-medium text-white">Menu</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:bg-white/10 rounded"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <ul className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-2 text-sm font-medium rounded transition-colors",
                    location.pathname === item.path
                      ? "bg-white/15 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default GovNav;
