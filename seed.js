/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const { MongoClient } = require('mongodb');

// Simple JS version of our seed data
const products = [
  {
    id: "prod_video_marketing",
    slug: "video-marketing",
    name: "Video Marketing Campaign",
    description: "Professional video marketing services including TV commercials, music videos, and viral social media content designed to convert.",
    price: 1500,
    image: "/assets/about/service-video.jpg",
    category: "Services",
    features: [
      "Concept Development & Scriptwriting",
      "Professional 4K Filming",
      "Cinematic Post-Production Editing",
      "Platform-specific exports (16:9, 9:16, 1:1)"
    ],
    addons: [
      { id: "addon_voiceover", name: "Professional Voiceover Artist", price: 250 },
      { id: "addon_drone", name: "Drone Videography Day Rate", price: 400 },
      { id: "addon_actors", name: "On-Screen Actors / Models", price: 600 }
    ]
  },
  {
    id: "prod_digital_marketing",
    slug: "digital-marketing",
    name: "Digital Marketing Retainer",
    description: "Comprehensive digital marketing strategies to boost your online presence, drive traffic, and increase conversions across multiple channels.",
    price: 1200,
    image: "/assets/about/service-digital.jpg",
    category: "Services",
    features: [
      "Monthly Strategy Consultation",
      "Multi-channel Campaign Management",
      "Performance Analytics & Reporting",
      "A/B Testing and Optimization"
    ],
    addons: [
      { id: "addon_ads_management", name: "Paid Ads Management (Google/Meta)", price: 500 },
      { id: "addon_email", name: "Email Marketing Automation", price: 300 }
    ]
  },
  {
    id: "prod_website_design",
    slug: "website-design",
    name: "Custom Website Design",
    description: "High-performance, beautifully designed responsive websites built for speed, SEO, and massive conversion rates.",
    price: 2500,
    image: "/assets/about/hero.jpg",
    category: "Services",
    features: [
      "Custom UI/UX Design (Figma)",
      "Fully Responsive Development",
      "Basic SEO Setup",
      "CMS Integration"
    ],
    addons: [
      { id: "addon_ecommerce", name: "E-Commerce Functionality", price: 1000 },
      { id: "addon_copywriting", name: "Professional Website Copywriting", price: 800 },
      { id: "addon_maintenance", name: "Monthly Maintenance & Hosting", price: 150 }
    ]
  },
  {
    id: "prod_graphic_design",
    slug: "graphic-designing",
    name: "Graphic Design Package",
    description: "Premium visual assets to elevate your brand identity. From logos to comprehensive marketing materials.",
    price: 800,
    image: "/assets/about/service-content.jpg",
    category: "Services",
    features: [
      "Initial Brand Consultation",
      "3 Custom Design Concepts",
      "Unlimited Revisions",
      "High-Resolution Source Files"
    ],
    addons: [
      { id: "addon_logo", name: "Full Logo Design Suite", price: 400 },
      { id: "addon_social_templates", name: "10x Social Media Templates", price: 250 },
      { id: "addon_print", name: "Print-Ready Business Cards & Menus", price: 200 }
    ]
  },
  {
    id: "prod_seo",
    slug: "seo",
    name: "Advanced SEO Optimization",
    description: "Strategic SEO implementation to dominate search rankings, drive organic traffic, and build long-term authority.",
    price: 900,
    image: "/assets/about/service-seo.jpg",
    category: "Services",
    features: [
      "Comprehensive Technical Audit",
      "On-Page Optimization",
      "Keyword Research Strategy",
      "Competitor Analysis"
    ],
    addons: [
      { id: "addon_backlinks", name: "Monthly High-DR Backlink Building", price: 600 },
      { id: "addon_content", name: "4x SEO-Optimized Blog Posts / Month", price: 500 }
    ]
  },
  {
    id: "prod_audio_marketing",
    slug: "audio-marketing",
    name: "Audio Marketing & Production",
    description: "Crystal clear audio production for radio commercials, podcasts, IVR systems, and custom jingles.",
    price: 600,
    image: "/assets/about/service-traditional.jpg",
    category: "Services",
    features: [
      "Studio Recording & Mastering",
      "Sound Design & SFX",
      "Broadcast-Ready Audio Files",
      "Commercial Licensing"
    ],
    addons: [
      { id: "addon_jingle", name: "Custom Brand Jingle Composition", price: 800 },
      { id: "addon_ivr", name: "Corporate IVR Phone Menu Recording", price: 300 }
    ]
  },
  {
    id: "prod_branding",
    slug: "branding",
    name: "Complete Brand Identity",
    description: "A full architectural overhaul of your brand's look, feel, and voice to position you as a premium leader in your industry.",
    price: 3500,
    image: "/assets/about/service-screens.jpg",
    category: "Services",
    features: [
      "Brand Strategy & Positioning Workshop",
      "Comprehensive Visual Identity System",
      "Brand Guidelines / Rulebook",
      "Tone of Voice Development"
    ],
    addons: [
      { id: "addon_brand_launch", name: "Brand Launch Campaign Strategy", price: 1200 }
    ]
  }
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("No MONGODB_URI found.");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB.");
    
    const db = client.db('wedoeffects');
    const productsCollection = db.collection('products');

    let inserted = 0;
    let updated = 0;

    for (const product of products) {
      const result = await productsCollection.updateOne(
        { slug: product.slug },
        { $set: product },
        { upsert: true }
      );
      if (result.upsertedCount > 0) inserted++;
      else if (result.modifiedCount > 0) updated++;
    }

    console.log(`Seeding complete. Inserted: ${inserted}, Updated: ${updated}`);
    
    await productsCollection.createIndex({ slug: 1 }, { unique: true });

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    const requiredCollections = ['customers', 'carts', 'orders', 'enquiries'];
    for (const name of requiredCollections) {
      if (!collectionNames.includes(name)) {
        await db.createCollection(name);
        console.log(`Created collection: ${name}`);
      }
    }

  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    await client.close();
  }
}

run();
