import Layout from "@/components/Layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout title="Home">
      <h1>Coucou</h1>
    </Layout>
  );
}
