import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/read">Read</Link>
        </li>
        <li>
          <Link href="/create">Create</Link>
        </li>
      </ul>
    </main>
  );
}
