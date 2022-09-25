import { randomBytes } from 'crypto';

// credits: https://github.com/poppinss/utils/blob/9a1280ac62b2f0091e529275031dd092367b78d9/src/Helpers/string.ts#L57

function normalizeBase64(value: string) {
  return value.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
}

export function generateRandom(size: number) {
  const bits = (size + 1) * 6;
  const buffer = randomBytes(Math.ceil(bits / 8));
  return normalizeBase64(buffer.toString('base64')).slice(0, size);
}
