import {getRequestConfig} from 'next-intl/server';

export const locales = ["en", "de"];
export const defaultLocale = "de";

export default getRequestConfig(async ({locale}) => {
  const resolvedLocale = locale || defaultLocale;
  return {
    locale: resolvedLocale,
    messages: (await import(`../public/locales/${resolvedLocale}/common.json`)).default
  };
});