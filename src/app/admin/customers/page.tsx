'use client';

import React, { useEffect, useState } from 'react';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  createdAt: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/customers')
      .then(res => res.json())
      .then(data => {
        setCustomers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Customers</h1>
        <p className="text-foreground/70 mt-1">View your customer base.</p>
      </div>

      {loading ? (
        <div className="animate-pulse h-64 bg-surface rounded-xl"></div>
      ) : (
        <div className="bg-surface border border-border/20 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-background/50 border-b border-border/20 text-foreground/70 text-sm">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Company</th>
                  <th className="p-4 font-medium">Added On</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id} className="border-b border-border/10 hover:bg-background/30 transition-colors">
                    <td className="p-4 font-bold text-foreground">{customer.name}</td>
                    <td className="p-4 text-foreground/80">{customer.email}</td>
                    <td className="p-4 text-foreground/80">{customer.phone}</td>
                    <td className="p-4 text-foreground/80">{customer.companyName || '-'}</td>
                    <td className="p-4 text-foreground/80">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-foreground/50">No customers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
