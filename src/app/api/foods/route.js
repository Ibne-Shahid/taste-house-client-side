import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("taste_house");

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    if (id) {
      const food = await db.collection("foods").findOne({ _id: new ObjectId(id) });

      if (!food) {
        return new Response(JSON.stringify({ error: "Food not found" }), {
          status: 404,
        });
      }

      return new Response(JSON.stringify(food), { status: 200 });
    }

    const allFoods = await db.collection("foods").find({}).toArray();

    if (type === "top") {
      const topFoods = allFoods.slice(0, 6);
      return new Response(JSON.stringify(topFoods), { status: 200 });
    }

    return new Response(JSON.stringify(allFoods), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
