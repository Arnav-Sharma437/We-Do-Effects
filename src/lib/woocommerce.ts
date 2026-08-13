import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// This file configures the official WooCommerce REST API client.
// It requires the environment variables to be set in your .env or .env.local file.

export const wcApi = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WC_URL || '',
  consumerKey: process.env.WC_CONSUMER_KEY || '',
  consumerSecret: process.env.WC_CONSUMER_SECRET || '',
  version: "wc/v3"
});

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_to: string | null;
  price_html: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; name: string; alt: string }[];
  attributes: { id: number; name: string; position: number; visible: boolean; variation: boolean; options: string[] }[];
}

export interface WCVariation {
  id: number;
  date_created: string;
  description: string;
  permalink: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  status: string;
  purchasable: boolean;
  virtual: boolean;
  image: { id: number; src: string; name: string; alt: string } | null;
  attributes: { id: number; name: string; option: string }[];
}
