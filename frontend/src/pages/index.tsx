import { useAddTestMutation } from "@/types/graphql";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const { data, loading, error } = useTestsQuery();
  let input: any;
  const [createTest, { data, loading, error }] = useAddTestMutation();
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  return (
    <main className="">
      {/* {data?.tests.map((a) => <p key={a.id}>{a.text}</p>)} */}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createTest({ variables: { text: input.value } });
            input.value = "";
          }}
        >
          <input
            ref={(node) => {
              input = node;
            }}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    </main>
  );
}
