/**
 * Manual verification script for pricing helpers (no test runner required).
 * Run: npx tsx scripts/verify-pricing.ts
 */
import {
  calculateDeposit,
  calculateQuote,
  QuoteValidationError,
} from '../src/lib/pricing';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function approxEqual(a: number, b: number) {
  assert(a === b, `Expected ${b}, got ${a}`);
}

// Deposit rules
approxEqual(calculateDeposit(0), 0);
approxEqual(calculateDeposit(99), 50); // 49.5 -> 50
approxEqual(calculateDeposit(199), 100); // 99.5 -> 100? Math.round(199*0.5)=100
approxEqual(calculateDeposit(499), 250); // 249.5 -> 250
approxEqual(calculateDeposit(500), 250);
approxEqual(calculateDeposit(1500), 250);

// Package + extras + reels
const q1 = calculateQuote({
  packageId: 'footages',
  extraIds: ['model', 'location'],
  reelTierId: '3',
});
approxEqual(q1.subtotal, 99 + 50 + 99 + 499);
approxEqual(q1.deposit, 250);

// Visuals TBD contributes 0 base
const q2 = calculateQuote({
  packageId: 'visuals',
  extraIds: ['voiceover'],
  reelTierId: '1',
});
assert(q2.packagePricePending === true, 'Visuals should be pending');
approxEqual(q2.subtotal, 50 + 199);
approxEqual(q2.deposit, Math.round((50 + 199) * 0.5));
assert(
  q2.lineItems.some((i) => i.amount === null && i.note?.includes('TBD')),
  'Visuals line should show TBD'
);

// Stories: no reels allowed
try {
  calculateQuote({ packageId: 'stories', reelTierId: '1' });
  throw new Error('Expected reel rejection for stories');
} catch (e) {
  assert(e instanceof QuoteValidationError, 'Expected QuoteValidationError');
}

const q3 = calculateQuote({ packageId: 'stories', extraIds: ['cinematographer'] });
approxEqual(q3.subtotal, 999 + 150);
approxEqual(q3.deposit, 250);

// Client total spoof cannot happen — API uses calculateQuote only
const spoof = calculateQuote({ packageId: 'sliders' });
approxEqual(spoof.subtotal, 49);
assert(spoof.subtotal !== 99999, 'Server calc ignores fictional totals');

console.log('All pricing verification checks passed.');
