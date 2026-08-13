'use client';

import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, Users, MessageSquare } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="p-8">
        <div className="animate-pulse flex flex-col space-y-8">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="h-32 bg-surface rounded-xl"></div>
            <div className="h-32 bg-surface rounded-xl"></div>
            <div className="h-32 bg-surface rounded-xl"></div>
            <div className="h-32 bg-surface rounded-xl"></div>
          </div>
          <div className="h-96 bg-surface rounded-xl"></div>
        </div>
      </div>
    );
  }

  const kpis = [
    { label: 'Total Revenue', value: `$${data.totals.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Total Orders', value: data.totals.orders, icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Customers', value: data.totals.customers, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Enquiries', value: data.totals.enquiries, icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-500/10' }
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground/70 mt-1">Overview of your business performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-surface border border-border/20 rounded-xl p-6 shadow-sm flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground/70">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-foreground">{kpi.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-foreground mb-6">Revenue Trend</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenueTrends}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#d4af37' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-foreground mb-6">Top Services</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.mostPurchasedServices} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#ffffff50" fontSize={11} tickLine={false} axisLine={false} width={100} />
                <Tooltip 
                  cursor={{fill: '#ffffff05'}}
                  contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#ffffff20', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#d4af37" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-foreground mb-4">Order Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <span className="font-medium text-amber-500">Pending</span>
              <span className="font-bold text-lg text-amber-500">{data.orderStatus.pending}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <span className="font-medium text-green-500">Completed</span>
              <span className="font-bold text-lg text-green-500">{data.orderStatus.completed}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <span className="font-medium text-red-500">Cancelled</span>
              <span className="font-bold text-lg text-red-500">{data.orderStatus.cancelled}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-surface border border-border/20 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-serif font-bold text-foreground mb-4">Popular Add-ons</h2>
          <div className="space-y-3">
            {data.popularAddons.map((addon: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-3 border-b border-border/10 last:border-0">
                <span className="font-medium text-foreground">{addon.name}</span>
                <span className="text-accent font-bold">{addon.count} sold</span>
              </div>
            ))}
            {data.popularAddons.length === 0 && (
              <div className="text-foreground/50 text-center py-4">No data yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
