import { NextResponse } from 'next/server';
import { wcApi } from '@/lib/woocommerce';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, company, email, phone, notes, items } = body;

    if (!process.env.NEXT_PUBLIC_WC_URL || !process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET) {
       return NextResponse.json({ error: 'WooCommerce API keys are not configured.' }, { status: 500 });
    }

    // Construct the WooCommerce Order payload
    const orderData = {
      payment_method: "bacs",
      payment_method_title: "Invoice",
      set_paid: false,
      billing: {
        first_name: firstName,
        last_name: lastName,
        company: company || "",
        email: email,
        phone: phone,
      },
      customer_note: notes || "",
      line_items: items.map((item: any) => {
        const lineItem: any = {
          product_id: parseInt(item.product.id),
          quantity: item.quantity,
        };

        // If they selected variations/addons, we attach them as meta data to the order line item
        // In a strict WooCommerce setup, these would be variation_ids
        if (item.selectedAddons && item.selectedAddons.length > 0) {
          lineItem.meta_data = item.selectedAddons.map((addon: any) => ({
            key: "Add-on",
            value: `${addon.name} (+£${addon.price})`
          }));
          // We adjust the subtotal manually in WC if we are passing custom pricing
          // Otherwise, if they are real WC variations, we would pass `variation_id: addon.id`
        }

        return lineItem;
      })
    };

    const response = await wcApi.post("orders", orderData);

    return NextResponse.json({ success: true, orderId: response.data.id });

  } catch (error: any) {
    console.error("[WC_ORDER_ERROR]", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.message || 'Failed to create WooCommerce order.' }, 
      { status: 500 }
    );
  }
}
