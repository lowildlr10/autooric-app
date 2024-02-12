import type { Metadata } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { globalTheme } from '@/styles/theme/globalThemeOptions'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Automated Official Receipt Issuance and Collection System (AutoORIC)',
  description:
    'RFSO 15 AUTOMATED OFFICIAL RECEIPT ISSUANCE AND COLLECTION REPORTING',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={globalTheme}>
            <Toaster position='top-right' />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
