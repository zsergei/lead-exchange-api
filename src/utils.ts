import { v4 as uuidv4 } from 'uuid';
import { createHash } from 'crypto';

export function generateNumericIdFromUUID(): number {
  const uuid = uuidv4();
  const hash = createHash('sha256').update(uuid).digest('hex');
  return parseInt(hash.substring(0, 15), 16); // Convert part of the hash to a number
}

export function getCurrentFormattedDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return new Date(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
}

export function getCurrentISOTime() {
  return new Date().toISOString();
}

export function generatePassword(
  length: number = 12,
  options: {
    hasNumbers?: boolean;
    hasSymbols?: boolean;
    hasUpperCase?: boolean;
    hasLowerCase?: boolean;
  } = {}
): string {
  const {
    hasNumbers = true,
    hasSymbols = true,
    hasUpperCase = true,
    hasLowerCase = true,
  } = options;

  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+{}[]<>?';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';

  let characters = '';
  if (hasNumbers) characters += numbers;
  if (hasSymbols) characters += symbols;
  if (hasUpperCase) characters += upperCaseLetters;
  if (hasLowerCase) characters += lowerCaseLetters;

  if (!characters.length) {
    // throw new Error('At least one character type must be selected');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

export function generateRandomCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function obfuscatePhoneNumber(phoneNumber) {
  const phoneStr = phoneNumber.toString();
  const firstTwo = phoneStr.slice(0, 3); // First 3 digits
  const lastTwo = phoneStr.slice(-2); // Last 2 digits
  const masked = '*'.repeat(phoneStr.length - 5); // Replace the middle with '*'
  return firstTwo + masked + lastTwo;
}
