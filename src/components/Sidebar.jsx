
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Clock, 
  BarChart, 
  Settings, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const navItems = [
    { path: '/', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { path: '/entries', icon: <Clock className="h-5 w-5" />, label: 'Registros' },
    { path: '/reports', icon: <BarChart className="h-5 w-5" />, label: 'Relatórios' },
    { path: '/settings', icon: <Settings className="h-5 w-5" />, label: 'Configurações' },
  ];
  
  const sidebarVariants = {
    open: {
      width: '240px',
      transition: { duration: 0.3 }
    },
    closed: {
      width: '72px',
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-30 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background md:relative",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex h-16 items-center justify-center border-b px-4">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Clock className="h-6 w-6 text-primary" />
            {isOpen && (
              <motion.span 
                className="text-lg font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                TimeTracker
              </motion.span>
            )}
          </motion.div>
        </div>
        
        <nav className="flex-1 space-y-2 p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              )}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
        
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5 mr-2" />
            {isOpen && <span>Recolher</span>}
          </Button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
