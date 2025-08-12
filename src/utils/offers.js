export function isOfferCurrentlyActive(offer, now = new Date()) {
  if (!offer || offer.active === false) return false;
  const start = offer.starts_at ? new Date(offer.starts_at) : null;
  const end = offer.ends_at ? new Date(offer.ends_at) : null;
  const time = now.getTime();
  if (start && time < start.getTime()) return false;
  if (end && time > end.getTime()) return false;
  return true;
}

export function applyOffer(price, offer) {
  if (!offer || !isOfferCurrentlyActive(offer)) return price;
  if (offer.type === 'percent') {
    const discounted = price * (1 - (offer.value || 0) / 100);
    return Math.max(0, Math.round(discounted));
  }
  if (offer.type === 'flat') {
    const discounted = price - (offer.value || 0);
    return Math.max(0, Math.round(discounted));
  }
  return price;
}