export const metadata = {
  title: 'Pejman Chat',
  description: 'A simple chat with N8N + AI',
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
