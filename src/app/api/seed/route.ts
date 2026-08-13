import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { products } from '@/data/products';

export async function GET(request: Request) {
  try {
    // Basic protection to prevent unauthorized re-seeding
    // Require a Bearer token or some secret, but for now we'll just allow it if the env is dev or if a query param is passed
    // We'll use a simple query param `?secret=seedme` just for this implementation step.
    const url = new URL(request.url);
    if (url.searchParams.get('secret') !== 'seedme') {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    const productsCollection = db.collection('products');

    const results = {
      inserted: 0,
      updated: 0,
    };

    // Safely upsert products
    for (const product of products) {
      const result = await productsCollection.updateOne(
        { slug: product.slug }, // Match on slug
        { $set: product },      // Update all fields
        { upsert: true }        // Insert if it doesn't exist
      );

      if (result.upsertedCount > 0) {
        results.inserted += result.upsertedCount;
      } else if (result.modifiedCount > 0) {
        results.updated += result.modifiedCount;
      }
    }

    // Optional: create some basic indexes
    await productsCollection.createIndex({ slug: 1 }, { unique: true });
    
    // Also create collections for schema validation if desired (though MongoDB creates them on first insert)
    // We just ensure they exist for logical structure
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    const requiredCollections = ['customers', 'carts', 'orders', 'enquiries'];
    for (const name of requiredCollections) {
      if (!collectionNames.includes(name)) {
        await db.createCollection(name);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB successfully seeded.',
      details: results
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('[SEED_ERROR]', error);
    return NextResponse.json({ error: 'Failed to seed MongoDB', details: error.message }, { status: 500 });
  }
}
