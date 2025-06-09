import { customAlphabet } from 'nanoid';
import { SHORT_URL_ALPHABET, SHORT_URL_LENGTH } from 'src/config/constants';

const generateShortCode = customAlphabet(SHORT_URL_ALPHABET, Number(SHORT_URL_LENGTH));
export function createShortCode(): string {
  return generateShortCode();
}
