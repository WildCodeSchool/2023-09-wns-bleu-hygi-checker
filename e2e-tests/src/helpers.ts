import db from "../../backend/src/lib/datasource";

export async function connect() {
    await db.initialize()
}

export async function disconnect() {
    await db.destroy();
  }
