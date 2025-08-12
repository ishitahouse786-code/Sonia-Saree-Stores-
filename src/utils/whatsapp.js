export function buildWhatsAppOrderUrl({ product, name, phone, qty = 1, defaultCountryCode = '91' }) {
  const productTitle = product?.title_bn || product?.name || 'পণ্য';
  const safeQty = Number.isFinite(Number(qty)) && Number(qty) > 0 ? Number(qty) : 1;

  // keep only digits from phone and ensure country code prefix
  let digits = String(phone || '').replace(/\D+/g, '');
  if (!digits) return '';
  if (!digits.startsWith(defaultCountryCode)) {
    digits = `${defaultCountryCode}${digits}`;
  }

  const lines = [
    `নাম: ${name || ''}`,
    `প্রোডাক্ট: ${productTitle}`,
    `পরিমাণ: ${safeQty}`,
  ];
  const msg = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${digits}?text=${msg}`;
}