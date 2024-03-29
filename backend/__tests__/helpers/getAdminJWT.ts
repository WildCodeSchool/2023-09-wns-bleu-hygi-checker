import { SignJWT } from "jose";
import User from "../../src/entities/user.entity";

export default async function () {
  const admin = await User.create({
    role: "ADMIN",
    email: "admin@app.com",
    password: "adminadmin",
  }).save();
  // const JWT = await jwt.sign({ userId: admin.id }, process.env.SECRET_KEY);

  const JWT = await new SignJWT({ userId: admin.id })
    .setProtectedHeader({ alg: "HS256", typ: "jwt" })
    .setExpirationTime("1m")
    .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));

  return { admin, JWT };
}
