import { execute } from "../jest.setup";
import Test from "../src/entities/test.entity";
import getTest from "./operations/getTest";

describe("TestRevsolver", () => {
  it("Placeholder Test", async () => {
    await Test.create({
      text: "1) texte du premier test d'intégration",
    }).save();
    await Test.create({
      text: "2) texte du deuxième test d'intégration",
    }).save();
    expect( await execute(getTest)).toMatchInlineSnapshot();
  });
});
