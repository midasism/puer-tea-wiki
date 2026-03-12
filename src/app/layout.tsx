import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC, Ma_Shan_Zheng } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-sc",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-sc",
});

const maShanZheng = Ma_Shan_Zheng({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ma-shan-zheng",
});

export const metadata: Metadata = {
  title: "普洱茶志 | 云南普洱茶科普百科",
  description:
    "普洱茶志是专注于云南普洱茶的科普百科网站，涵盖普洱茶的历史渊源、制作工艺、产区山头、品鉴知识及专业名词释义，帮助茶友系统了解普洱茶的深厚文化。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme:dark)").matches);if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${notoSerifSC.variable} ${notoSansSC.variable} ${maShanZheng.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="paper-texture min-h-screen font-sans antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
