import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  try {
    const mealsPath = path.join(
      __dirname,
      "..",
      "backend",
      "data",
      "available-meals.json",
    );

    const meals = await fs.readFile(mealsPath, "utf8");

    res.status(200).json(JSON.parse(meals));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not load meals.",
    });
  }
}
