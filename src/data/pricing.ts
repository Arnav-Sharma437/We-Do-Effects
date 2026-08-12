export type PackageId =
  | 'sliders'
  | 'footages'
  | 'informative'
  | 'visuals'
  | 'stories'
  | 'hox-pox'
  | 'podcast';

export type ExtraId =
  | 'model'
  | 'cinematographer'
  | 'photographer'
  | 'script'
  | 'voiceover'
  | 'location';

export type ReelTierId = '1' | '3' | '5' | '10';

export interface PricingPackage {
  id: PackageId;
  name: string;
  /** Base price in GBP. Null means TBD / POA — contributes £0 until set. */
  basePrice: number | null;
  /** When true, show reel quantity selector */
  supportsReels: boolean;
  /** When true, treat basePrice as a starting / "from" price */
  fromPrice?: boolean;
  description?: string;
}

export interface PricingExtra {
  id: ExtraId;
  name: string;
  price: number;
  question: string;
}

export interface ReelTier {
  id: ReelTierId;
  quantity: number;
  price: number;
  label: string;
}

export const packages: PricingPackage[] = [
  {
    id: 'sliders',
    name: 'Sliders',
    basePrice: 49,
    supportsReels: true,
    description: 'Short motion slides for social and ads.',
  },
  {
    id: 'footages',
    name: 'Footages',
    basePrice: 99,
    supportsReels: true,
    description: 'Edited footage packages ready to publish.',
  },
  {
    id: 'informative',
    name: 'Informative',
    basePrice: 99,
    supportsReels: true,
    description: 'Clear, informative video content.',
  },
  {
    id: 'visuals',
    name: 'Visuals',
    basePrice: null,
    supportsReels: true,
    description: 'Custom visual packages — pricing TBD.',
  },
  {
    id: 'stories',
    name: 'Stories',
    basePrice: 999,
    supportsReels: false,
    description: 'Full story-led video production.',
  },
  {
    id: 'hox-pox',
    name: 'Hox Pox',
    basePrice: 299,
    supportsReels: false,
    fromPrice: true,
    description: 'Hox Pox production packages from £299.',
  },
  {
    id: 'podcast',
    name: 'Podcast',
    basePrice: 1500,
    supportsReels: false,
    description: 'End-to-end podcast video production.',
  },
];

export const extras: PricingExtra[] = [
  {
    id: 'model',
    name: 'Model',
    price: 50,
    question: 'Need a Model?',
  },
  {
    id: 'cinematographer',
    name: 'Cinematographer',
    price: 150,
    question: 'Need a Cinematographer?',
  },
  {
    id: 'photographer',
    name: 'Photographer',
    price: 100,
    question: 'Need a Photographer?',
  },
  {
    id: 'script',
    name: 'Script Writing',
    price: 50,
    question: 'Need Script Writing?',
  },
  {
    id: 'voiceover',
    name: 'Voice Over',
    price: 50,
    question: 'Need Voice Over?',
  },
  {
    id: 'location',
    name: 'Location Shoot',
    price: 99,
    question: 'Location Shoot?',
  },
];

export const reelTiers: ReelTier[] = [
  { id: '1', quantity: 1, price: 199, label: '1 Reel' },
  { id: '3', quantity: 3, price: 499, label: '3 Reels' },
  { id: '5', quantity: 5, price: 749, label: '5 Reels' },
  { id: '10', quantity: 10, price: 1299, label: '10 Reels' },
];

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10MB total

export const ACCEPTED_UPLOAD_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/quicktime',
  'video/webm',
  'application/pdf',
] as const;

export const ACCEPTED_UPLOAD_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
  '.mp4',
  '.mov',
  '.webm',
  '.pdf',
] as const;

export function getPackageById(id: string): PricingPackage | undefined {
  return packages.find((pkg) => pkg.id === id);
}

export function getExtraById(id: string): PricingExtra | undefined {
  return extras.find((extra) => extra.id === id);
}

export function getReelTierById(id: string): ReelTier | undefined {
  return reelTiers.find((tier) => tier.id === id);
}
