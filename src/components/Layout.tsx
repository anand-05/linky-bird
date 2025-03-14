
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  PlusCircle, 
  BarChart, 
  Settings,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5 mr-2" />
    },
    {
      name: "Create Link",
      path: "/create",
      icon: <PlusCircle className="h-5 w-5 mr-2" />
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart className="h-5 w-5 mr-2" />
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <Button 
          variant="ghost" 
          className="fixed top-4 right-4 z-50 p-2"
          onClick={toggleMenu}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "w-64 bg-sidebar text-sidebar-foreground flex-shrink-0",
          isMobile && "fixed inset-y-0 left-0 z-40 transform transition-transform duration-200 ease-in-out",
          isMobile && (menuOpen ? "translate-x-0" : "-translate-x-full")
        )}
      >
        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="h-8 w-8 bg-accent rounded-md flex items-center justify-center mr-2">
              <span className="font-bold text-accent-foreground">LM</span>
            </div>
            <h1 className="text-xl font-bold">Link Manager</h1>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
                onClick={closeMenu}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center"
          >
            <Settings className="h-5 w-5 mr-2" />
            <span>Settings</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 overflow-y-auto",
          isMobile && menuOpen && "opacity-50"
        )}
      >
        <main className="p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
