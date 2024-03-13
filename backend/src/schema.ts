import { buildSchema } from 'type-graphql'
import { customAuthChecker } from './lib/authChecker'
import TestResolver from './resolvers/test.resolver'
import UserResolver from './resolvers/user.resolver'

export default buildSchema({
  resolvers: [TestResolver, UserResolver],
  validate: false,
  authChecker: customAuthChecker,
})
