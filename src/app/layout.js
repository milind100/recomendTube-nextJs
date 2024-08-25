/* eslint-disable react/react-in-jsx-scope */
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "../reducers/StoreProvider";
import MainLayoutWrapper from "../Layouts/MainLayoutWrapper";
import AuthProvider from "../Layouts/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecomendTube - Create and Manage YouTube Playlists",
  description:
    "RecomendTube allows you to create, manage, and share YouTube playlists from different channels. Perfect for trainers, teachers, and content curators.",
  keywords:
    "YouTube playlists, create playlists, manage playlists, share playlists, video curation, RecomendTube",
  author: "RecomendTube Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <MainLayoutWrapper>{children}</MainLayoutWrapper>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
