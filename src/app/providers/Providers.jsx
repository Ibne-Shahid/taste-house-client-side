
'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="restaurant"
      themes={['light', 'dark', 'restaurant']}
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}