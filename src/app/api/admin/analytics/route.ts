import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDb();
    
    // Total Orders & Revenue
    const orders = await db.collection('orders').find({}).toArray();
    const totalOrders = orders.length;
    const revenue = orders.reduce((acc, order) => acc + (order.subtotal || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;

    // Total Customers
    const totalCustomers = await db.collection('customers').countDocuments();
    
    // Total Enquiries
    const totalEnquiries = await db.collection('enquiries').countDocuments();

    // Most popular products (based on orders)
    const productCounts: Record<string, number> = {};
    const addonCounts: Record<string, number> = {};
    
    orders.forEach(order => {
      order.items?.forEach((item: any) => {
        productCounts[item.product?.name] = (productCounts[item.product?.name] || 0) + (item.quantity || 1);
        item.selectedAddons?.forEach((addon: any) => {
          addonCounts[addon.name] = (addonCounts[addon.name] || 0) + (item.quantity || 1);
        });
      });
    });

    const mostPurchasedServices = Object.entries(productCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const popularAddons = Object.entries(addonCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Revenue Trends (last 7 days grouping for simplicity)
    // Real implementation would use MongoDB aggregation or date-fns grouping
    // Mocking the structure for the chart based on the actual orders
    const trendMap = new Map();
    orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      trendMap.set(date, (trendMap.get(date) || 0) + (order.subtotal || 0));
    });
    
    const revenueTrends = Array.from(trendMap.entries())
      .map(([date, amount]) => ({ date, amount }))
      .slice(-14); // Last 14 distinct dates

    return NextResponse.json({
      totals: {
        revenue,
        orders: totalOrders,
        customers: totalCustomers,
        enquiries: totalEnquiries
      },
      orderStatus: {
        pending: pendingOrders,
        completed: completedOrders,
        cancelled: cancelledOrders
      },
      mostPurchasedServices,
      popularAddons,
      revenueTrends,
      recentOrders: orders.slice(0, 5) // Latest 5
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
