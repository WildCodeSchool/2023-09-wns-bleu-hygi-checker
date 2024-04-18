import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://0923-bleu-2.wns.wilders.dev/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
