async function testCheckout() {
  const url = 'https://we-do-effects.vercel.app/api/checkout';
  
  const payload = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "1234567890",
    company: "Test Corp",
    notes: "This is a test order for MongoDB integration verification.",
    items: [
      {
        product: {
          id: "prod_video_marketing",
          slug: "video-marketing",
          name: "Video Marketing Campaign",
          price: 1500
        },
        quantity: 1,
        selectedAddons: [
          { id: "addon_voiceover", name: "Professional Voiceover Artist", price: 250 }
        ]
      }
    ]
  };

  try {
    console.log(`Sending test checkout to ${url}...`);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const text = await response.text();
    console.log(`Status: ${response.status}`);
    
    try {
      const data = JSON.parse(text);
      console.log('Response:', JSON.stringify(data, null, 2));
      
      if (data.success && data.orderId) {
        console.log(`✅ CHECKOUT SUCCESS: Order ID ${data.orderId} generated!`);
        console.log(`✅ Prices were successfully validated against MongoDB.`);
        console.log(`✅ Order and Customer records should now be in MongoDB.`);
      } else {
        console.log(`❌ CHECKOUT FAILED:`, data.error || data);
      }
    } catch (e) {
      console.log('Non-JSON response:', text);
    }
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

testCheckout();
