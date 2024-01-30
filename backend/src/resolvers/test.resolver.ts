import { Authorized, Query, Resolver } from "type-graphql";
import TestService from "../services/test.service";
import Test from "../entities/test.entity";

@Resolver()
export default class TestResolver {
  @Query(() => [Test])
  async books() {
    return await new TestService().testQuery();
  }
}
