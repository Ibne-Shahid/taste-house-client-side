import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
     console.log("PARAMS RECEIVED:", params);
    

    const client = await clientPromise;
    const db = client.db("taste_house");

    const result = await db
      .collection("foods")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Food not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Food deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
