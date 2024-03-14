import Layout from "@/components/Layout/Layout";
import { useTestsQuery } from "@/types/graphql";

export default function ReadPage() {
  const { data, loading, error } = useTestsQuery();
  return (
    <Layout title="Read">
      <ul>{data?.tests.map((a) => <li key={a.id}>{a.text}</li>)}</ul>
    </Layout>
  );
}
