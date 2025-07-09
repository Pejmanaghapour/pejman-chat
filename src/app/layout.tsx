// src/app/layout.tsx

export const metadata = {
  title: 'Pejman Chat',
  description: 'A simple AI chat using N8N + Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
