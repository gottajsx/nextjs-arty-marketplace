import Work from "@models/Work";
import User from "@models/User";
import { connectToDB } from "@mongodb/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { id } = await params;  
    const user = await User.findById(id);
    const workList = await Work.find({ creator: id }).populate("creator");
    console.log("workList:", workList);

    user.works = workList;
    try {
      await user.save();
    } catch (saveError) {
      console.error("Error saving user:", saveError);
      return new Response("Failed to save user", { status: 500 });
    }


    return new Response(JSON.stringify({ user: user, workList: workList }), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch work list by user", { status: 500 })
  }
}