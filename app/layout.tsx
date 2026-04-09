import type { Metadata } from "next";
import "./globals.css";
import { SCHOOL_NAME, LOGO_PATH } from "./lib/school-config";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: `Beri | ${SCHOOL_NAME} AI Assistant`,
  description: `Ask the ${SCHOOL_NAME} AI assistant about admissions, fees, curriculum, sport, and school life.`,
  icons: {
    icon: `${basePath}${LOGO_PATH}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#e5554f" />
        <link rel="icon" href={`${basePath}${LOGO_PATH}`} />
      </head>
      <body style={{ background: "#ffffff", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
