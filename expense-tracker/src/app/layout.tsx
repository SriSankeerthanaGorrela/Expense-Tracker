import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProtectedRoute } from "./protectedRoute";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Expense Tracker",
    template: "%s | Expense Tracker",
  },
  description:
    "Track your daily expenses, manage income, analyze spending habits, and stay financially organized with a secure and easy-to-use expense tracker.",
  keywords: [
    "expense tracker",
    "budget management",
    "personal finance",
    "money tracking",
    "income and expenses",
    "finance app",
    "expense manager",
  ],
  authors: [{ name: "Expense Tracker Team" }],
  creator: "Expense Tracker",
  applicationName: "Expense Tracker",

  metadataBase: new URL("https://expense-tracker.app"), // change when deployed

  openGraph: {
    title: "Expense Tracker",
    description:
      "A smart expense tracker to manage daily spending, track income, and gain insights into your finances.",
    url: "https://expense-tracker.app",
    siteName: "Expense Tracker",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Expense Tracker App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Expense Tracker",
    description:
      "Track expenses, manage income, and stay in control of your finances with Expense Tracker.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "finance",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProtectedRoute>
          {children}
           <Toaster
          position="top-right"
          toastOptions={{
            success: { duration: 2000 },
            error: { duration: 3000 }
          }}
        />
          </ProtectedRoute>
      </body>
    </html>
  );
}
