import { en, type Dictionary } from './en';
import { es } from './es';
export const languages = { en: { label: 'English', dictionary: en }, es: { label: 'Español', dictionary: es } } satisfies Record<string, { label: string; dictionary: Dictionary }>;
export type Locale = keyof typeof languages;
export const locales = Object.keys(languages) as Locale[];
export const defaultLocale: Locale = 'en';
export function isLocale(value: string): value is Locale { return Object.hasOwn(languages, value); }
