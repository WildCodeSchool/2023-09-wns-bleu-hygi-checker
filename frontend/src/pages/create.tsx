import CampaignCard from "@/components/CampaignCard";
import Layout from "@/components/Layout";
import { useAddTestMutation } from "@/types/graphql";
import { useState } from "react";

interface FormData {
  text: string;
}

const campaignTest = {
  title: "titleTest",
  url: "urlTest",
  urlNumber: 3,
};

export default function ReadPage() {
  const [text, setText] = useState("");
  const [createTest] = useAddTestMutation();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTest({ variables: { text: text } });
  };
  const handleChangeText = (e: any) => {
    setText(e.target.value);
  };
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const data = Object.fromEntries(formData) as FormData;
  //   createTest({ variables: { text: data.text } });
  // };

  return (
    <Layout title="Create">
      <form onSubmit={handleSubmit}>
        <input
          className="border"
          type="text"
          onChange={handleChangeText}
          name="text"
          required
          placeholder="Placeholder"
        />
        <button type="submit">Send</button>
      </form>
      <CampaignCard campaign={campaignTest} />
    </Layout>
  );
}
