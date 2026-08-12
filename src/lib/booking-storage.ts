export const BOOKING_STORAGE_KEY = 'wde-booking-selection';

export interface StoredBookingSelection {
  packageId: string;
  extraIds: string[];
  reelTierId: string | null;
}

export function saveBookingSelection(selection: StoredBookingSelection): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(selection));
  } catch {
    // Ignore quota / private mode failures; query string remains the primary path.
  }
}

export function loadBookingSelection(): StoredBookingSelection | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(BOOKING_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredBookingSelection;
    if (!parsed?.packageId) return null;
    return {
      packageId: parsed.packageId,
      extraIds: Array.isArray(parsed.extraIds) ? parsed.extraIds : [],
      reelTierId: parsed.reelTierId ?? null,
    };
  } catch {
    return null;
  }
}

export function clearBookingSelection(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(BOOKING_STORAGE_KEY);
  } catch {
    // no-op
  }
}
