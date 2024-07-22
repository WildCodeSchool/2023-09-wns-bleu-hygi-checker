import { buildSchema } from "type-graphql";

import { customAuthChecker } from "./lib/authChecker";
import CampaignResolver from "./resolvers/campaign.resolver";
import ResponseResolver from "./resolvers/response.resolver";
import TestResolver from "./resolvers/test.resolver";
import UrlResolver from "./resolvers/url.resolver";
import UserResolver from "./resolvers/user.resolver";
import CampaignUrlResolver from "./resolvers/campaignUrl.resolver";
import AccessCheckResolver from "./resolvers/accessCheck.resolver";
import PremiumResolver from "./resolvers/premium.resolver";

export default buildSchema({
  resolvers: [
    TestResolver,
    UserResolver,
    UrlResolver,
    ResponseResolver,
    CampaignResolver,
    CampaignUrlResolver,
    AccessCheckResolver,
    PremiumResolver,
  ],
  validate: true,
  authChecker: customAuthChecker,
});
