import { buildSchema } from "type-graphql";

import { customAuthChecker } from "./lib/authChecker";
import ResponseResolver from "./resolvers/response.resolver";
import TestResolver from "./resolvers/test.resolver";
import UrlResolver from "./resolvers/url.resolver";
import UserResolver from "./resolvers/user.resolver";
// import CampaingResolver from "./resolvers/campaing.resolver";

export default buildSchema({
  resolvers: [
    TestResolver,
    UserResolver,
    UrlResolver,
    ResponseResolver,
    // CampaingResolver,
  ],
  validate: false,
  authChecker: customAuthChecker,
});
