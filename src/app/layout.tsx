import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <SpeedInsights />
    </>
  );
}