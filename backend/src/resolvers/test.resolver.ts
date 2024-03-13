import { Authorized, Query, Resolver, Mutation, Arg } from 'type-graphql'
import TestService from '../services/test.service'
import Test from '../entities/test.entity'

@Resolver()
export default class TestResolver {
  @Authorized(['USER', 'ADMIN'])
  @Query(() => [Test])
  async tests() {
    return await new TestService().testQuery()
  }

  @Authorized(['USER', 'ADMIN'])
  @Mutation(() => Test)
  async addTest(@Arg('text') text: string) {
    console.log('Mes infos => ', text)

    const newTest = await new TestService().addOneTest({ text })
    console.log(newTest)
    return newTest
  }

  @Authorized(['ADMIN'])
  @Mutation(() => Test)
  async deleteTest(@Arg('id') id: string) {
    const TestDeleted = await new TestService().deleteTest(id)
    return TestDeleted
  }
}
