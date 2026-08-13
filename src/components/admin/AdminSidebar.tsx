'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, FileText, ShoppingCart, Users, MessageSquare, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products & Services', href: '/admin/products', icon: Package },
  { name: 'Content CMS', href: '/admin/content', icon: FileText },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="w-64 bg-surface border-r border-border/20 flex flex-col h-screen sticky top-0">
      <div className="h-20 flex items-center px-6 border-b border-border/20">
        <span className="font-serif font-bold text-xl text-foreground">WDE <span className="text-accent">Admin</span></span>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-foreground/70 hover:bg-background/50 hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
