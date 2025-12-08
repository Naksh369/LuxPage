import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Rubik, Work_Sans, Ubuntu, Zain, Poiret_One } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-work-sans",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300","400","500","700"],
  variable: "--font-ubuntu",
});

const zain = Zain({
  subsets: ["latin"],
  weight: ["200","300","400","700","800","900"],
  variable: "--font-zain",
});

const poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poiret",
});

export const metadata: Metadata = {
  title: "Sevo - Grow!",
  description: "Make your task easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${rubik.variable} ${workSans.variable} ${ubuntu.variable} ${zain.variable} ${poiret.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
