import { buildSchema } from "type-graphql";
import TestResolver  from "./resolvers/test.resolver";

export default buildSchema({
  resolvers: [TestResolver],
  validate: false,
});