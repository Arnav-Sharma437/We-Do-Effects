'use client';

import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface Order {
  _id: string;
  orderId: string;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
  };
  items: any[];
  subtotal: number;
  deposit: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground">Orders</h1>
        <p className="text-foreground/70 mt-1">View and manage customer orders.</p>
      </div>

      {loading ? (
        <div className="animate-pulse h-64 bg-surface rounded-xl"></div>
      ) : (
        <div className="bg-surface border border-border/20 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-background/50 border-b border-border/20 text-foreground/70 text-sm">
                  <th className="p-4 font-medium">Order Ref</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Deposit</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-border/10 hover:bg-background/30 transition-colors">
                    <td className="p-4 font-bold text-accent">{order.orderId}</td>
                    <td className="p-4 text-foreground/80">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="font-medium text-foreground">{order.customerDetails?.firstName} {order.customerDetails?.lastName}</div>
                      <div className="text-xs text-foreground/60">{order.customerDetails?.email}</div>
                    </td>
                    <td className="p-4 font-medium text-foreground">£{order.subtotal || 0}</td>
                    <td className="p-4 text-foreground/80">£{order.deposit || 0}</td>
                    <td className="p-4">
                      <select 
                        value={order.status || 'pending'}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`text-xs font-bold uppercase rounded px-2 py-1 border-none focus:ring-0 ${
                          order.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                          order.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                          'bg-amber-500/10 text-amber-500'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 text-foreground/70 hover:text-accent transition-colors" title="View details">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-foreground/50">No orders found.</td>
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
