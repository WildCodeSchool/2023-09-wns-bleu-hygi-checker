import { execute } from "../jest.setup";
import Test from "../src/entities/test.entity";
import getAdminContext from "./helpers/getAdminContext";
import addTest from "./operations/addTest";
import getTest from "./operations/getTest";

describe("TestRevsolver", () => {
  it("Placeholder Test", async () => {
    await Test.create({
      text: "1) texte du premier test d'intégration",
    }).save();
    await Test.create({
      text: "2) texte du deuxième test d'intégration",
    }).save();
    expect(await execute(getTest)).toMatchSnapshot(`
      {
        "data": {
          "tests": [
            {
              "id": "b84ba25f-edbf-4248-b229-c5a704e813cc",
              "text": "1) texte du premier test d'intégration",
            },
            {
              "id": "1ebd2d9a-a0c8-49d2-9bd3-0b691ff051e0",
              "text": "2) texte du deuxième test d'intégration",
            },
          ],
        },
      }
    `);
  });

  it("can create a test", async () => {
    const res = await execute(
      addTest,
      { data: { name: "test" } },
      await getAdminContext()
    );
    expect(res).toMatchSnapshot();
  });
});
