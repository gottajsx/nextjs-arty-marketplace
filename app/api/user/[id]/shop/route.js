import Work from "@models/Work";
import User from "@models/User";
import { connectToDB } from "@mongodb/database";

export const GET = async (req, context) => {
  try {
    await connectToDB();

    const { params } = context;
    const { id } = await params; // Résolution de 'params' avec 'await'

    const user = await User.findById(id);
    const workList = await Work.find({ creator: id }).populate("creator");

    user.works = workList;
    await user.save();

    return new Response(JSON.stringify({ user, workList }), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch work list by user", { status: 500 });
  }
};