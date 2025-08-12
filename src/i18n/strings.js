import bn from '../locales/bn.json';

export const t = (key) => (bn && Object.prototype.hasOwnProperty.call(bn, key) ? bn[key] : key);
export const strings = bn;