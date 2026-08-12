import {
  extras,
  getExtraById,
  getPackageById,
  getReelTierById,
  type ExtraId,
  type PackageId,
  type ReelTierId,
} from '@/data/pricing';

export interface QuoteSelection {
  packageId: PackageId;
  extraIds: ExtraId[];
  reelTierId: ReelTierId | null;
}

export interface QuoteLineItem {
  id: string;
  label: string;
  amount: number | null;
  note?: string;
}

export interface QuoteResult {
  packageId: PackageId;
  packageName: string;
  packageBasePrice: number | null;
  packagePricePending: boolean;
  extraIds: ExtraId[];
  reelTierId: ReelTierId | null;
  lineItems: QuoteLineItem[];
  subtotal: number;
  deposit: number;
  depositLabel: string;
}

export interface QuoteInput {
  packageId: string;
  extraIds?: string[];
  reelTierId?: string | null;
}

export class QuoteValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuoteValidationError';
  }
}

/** Deposit: under £500 → 50%; £500+ → £250 minimum. */
export function calculateDeposit(total: number): number {
  if (!Number.isFinite(total) || total <= 0) return 0;
  if (total < 500) return Math.round(total * 0.5);
  return 250;
}

export function formatGbp(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseQuoteInput(input: QuoteInput): QuoteSelection {
  const pkg = getPackageById(input.packageId);
  if (!pkg) {
    throw new QuoteValidationError('Please select a valid package.');
  }

  const rawExtras = Array.isArray(input.extraIds) ? input.extraIds : [];
  const uniqueExtras = [...new Set(rawExtras)];
  const extraIds: ExtraId[] = [];

  for (const id of uniqueExtras) {
    const extra = getExtraById(id);
    if (!extra) {
      throw new QuoteValidationError(`Unknown extra: ${id}`);
    }
    extraIds.push(extra.id);
  }

  let reelTierId: ReelTierId | null = null;
  if (pkg.supportsReels) {
    if (input.reelTierId) {
      const tier = getReelTierById(input.reelTierId);
      if (!tier) {
        throw new QuoteValidationError('Please select a valid reel package.');
      }
      reelTierId = tier.id;
    }
  } else if (input.reelTierId) {
    throw new QuoteValidationError(
      `${pkg.name} does not support reel quantity selection.`
    );
  }

  return {
    packageId: pkg.id,
    extraIds,
    reelTierId,
  };
}

/** Pure quote calculation from centralized pricing config. Never trust client totals. */
export function calculateQuote(input: QuoteInput): QuoteResult {
  const selection = parseQuoteInput(input);
  const pkg = getPackageById(selection.packageId)!;
  const lineItems: QuoteLineItem[] = [];

  const packagePricePending = pkg.basePrice === null;
  const packageAmount = pkg.basePrice ?? 0;

  lineItems.push({
    id: `package:${pkg.id}`,
    label: pkg.fromPrice && pkg.basePrice !== null ? `${pkg.name} (from)` : pkg.name,
    amount: packagePricePending ? null : packageAmount,
    note: packagePricePending ? 'Price TBD / POA' : undefined,
  });

  let extrasTotal = 0;
  for (const extraId of selection.extraIds) {
    const extra = getExtraById(extraId)!;
    extrasTotal += extra.price;
    lineItems.push({
      id: `extra:${extra.id}`,
      label: extra.name,
      amount: extra.price,
    });
  }

  let reelTotal = 0;
  if (selection.reelTierId) {
    const tier = getReelTierById(selection.reelTierId)!;
    reelTotal = tier.price;
    lineItems.push({
      id: `reel:${tier.id}`,
      label: tier.label,
      amount: tier.price,
    });
  }

  const subtotal = packageAmount + extrasTotal + reelTotal;
  const deposit = calculateDeposit(subtotal);

  let depositLabel: string;
  if (subtotal <= 0) {
    depositLabel = 'Deposit calculated once pricing is confirmed';
  } else if (subtotal < 500) {
    depositLabel = '50% deposit';
  } else {
    depositLabel = '£250 minimum deposit';
  }

  return {
    packageId: pkg.id,
    packageName: pkg.name,
    packageBasePrice: pkg.basePrice,
    packagePricePending,
    extraIds: selection.extraIds,
    reelTierId: selection.reelTierId,
    lineItems,
    subtotal,
    deposit,
    depositLabel,
  };
}

export function serializeQuoteSelection(selection: QuoteSelection): string {
  const params = new URLSearchParams();
  params.set('package', selection.packageId);
  if (selection.extraIds.length > 0) {
    params.set('extras', selection.extraIds.join(','));
  }
  if (selection.reelTierId) {
    params.set('reels', selection.reelTierId);
  }
  return params.toString();
}

export function selectionFromSearchParams(
  params: URLSearchParams | { get(name: string): string | null }
): QuoteInput | null {
  const packageId = params.get('package');
  if (!packageId) return null;

  const extrasRaw = params.get('extras');
  const extraIds = extrasRaw
    ? extrasRaw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const reelTierId = params.get('reels');

  return {
    packageId,
    extraIds,
    reelTierId: reelTierId || null,
  };
}

export function defaultExtraSelections(): Record<ExtraId, boolean> {
  return extras.reduce(
    (acc, extra) => {
      acc[extra.id] = false;
      return acc;
    },
    {} as Record<ExtraId, boolean>
  );
}
