import { useTestsQuery } from "@/types/graphql";

export default function ReadPage() {
  const { data, loading, error } = useTestsQuery();
  return <main>{data?.tests.map((a) => <p key={a.id}>{a.text}</p>)}</main>;
}
