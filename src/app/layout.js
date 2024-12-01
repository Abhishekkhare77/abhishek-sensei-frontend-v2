import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/utils/ClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/utils/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abhishek Sensei",
  description: "Learn to code with Abhishek Sensei",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientProvider>
            {children}
            <Toaster />
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
