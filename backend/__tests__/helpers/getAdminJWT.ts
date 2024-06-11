import { SignJWT } from "jose";
import User from "../../src/entities/user.entity";

export default async function () {
  const admin = await User.create({
    username: "Grand chef",
    role: "ADMIN",
    email: "admin@app.com",
    password: "adminadmin",
    accepted_terms: true,
  }).save();

  const JWT = await new SignJWT({ userId: admin.id })
    .setProtectedHeader({ alg: "HS256", typ: "jwt" })
    .setExpirationTime("1m")
    .sign(new TextEncoder().encode(`${process.env.JWT_PRIVATE_KEY}`));

  return { admin, JWT };
}
