import jwt from "jose";
import User, { hashPassword } from "../../src/entities/user.entity";
import env from "../../src/env";

export default async function () {
  const admin = await User.create({
    role: "ADMIN",
    email: "admin@app.com",
    password: await hashPassword("adminadmin"),
  }).save();
  const JWT = await jwt.sign({ userId: admin.id }, env.JWT_PRIVATE_KEY);
  return { admin, JWT };
}
