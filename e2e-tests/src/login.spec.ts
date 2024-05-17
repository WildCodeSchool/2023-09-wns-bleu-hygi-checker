import { connect, disconnect } from "./helpers";
import { clearDB } from "../../backend/src/lib/datasource";
import { test, expect } from "@playwright/test";
import UserService from "../../backend/src/services/user.service";

test.beforeAll(connect);
test.beforeEach(clearDB);
test.afterAll(disconnect);

const email = "user@test.com";
const password = "test";

async function createUser() {
  const userService = new UserService();
  await userService.createUser({ email, password });
}

test("can connect with correct credentials", async ({ page }) => {
  await createUser();

  await page.goto("http://localhost:3000/auth/login");
  await page.getByTestId("login-email").fill(email);
  await page.getByTestId("login-password").fill(password);
  await page.getByRole("button", { name: "Connexion" }).click();
  await expect(
    page.getByRole("link", { name: "Create new campaign" })
  ).toBeVisible(); // await page.pause();
});
