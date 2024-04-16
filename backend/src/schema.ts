import { buildSchema } from "type-graphql";

import { customAuthChecker } from "./lib/authChecker";
import TestResolver from "./resolvers/test.resolver";
import UserResolver from "./resolvers/user.resolver";
import ResponseResolver from "./resolvers/response.resolver";
import UrlResolver from "./resolvers/url.resolver";

export default buildSchema({
  resolvers: [TestResolver, UserResolver, ResponseResolver, UrlResolver],
  validate: false,
  authChecker: customAuthChecker,
});
