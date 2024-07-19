import { connect, disconnect } from "./helpers";
import { clearDB } from "../../backend/src/lib/datasource";
import { test } from "@playwright/test";
import UserService from "../../backend/src/services/user.service";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

const email = "jane.doe@example.com";
const password = "Hygichecker69!";
const username = "Jane Doe";
const accepted_terms = true;

async function createUser() {
  const userService = new UserService();
  await userService.createUser({ email, password, username, accepted_terms });
}

test("can connect with correct credentials", async ({ page }) => {
  await createUser();

  await page.goto("http://localhost:3000/auth/login");
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForURL("**/dashboard/campaign/lists");
});
