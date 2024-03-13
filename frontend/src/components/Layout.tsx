import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="health-check" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <header>
        <ul className="flex justify-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/auth/register">Inscription</Link>
          </li>
          <li>
            <Link href="/auth/login">Connexion</Link>
          </li>
          <li>
            <Link href="/response">Réponse</Link>
          </li>
        </ul>
      </header>
      <main className="main-content">{children}</main>
    </>
  );
}
