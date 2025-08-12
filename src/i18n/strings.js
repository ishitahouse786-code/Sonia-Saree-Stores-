import bn from '../locales/bn.json';
const locale = bn;
export function t(key) {
  return locale[key] || key;
}