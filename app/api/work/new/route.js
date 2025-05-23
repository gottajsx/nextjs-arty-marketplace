import { connectToDB } from "@mongodb/database";
import { writeFile } from "fs/promises"
import Work from "@models/Work";
import { uploadDirectory } from "@config/upload";

export async function POST (req) {
  try {
    /* Connect to MongoDB */
    await connectToDB()

    const data = await req.formData()

    /* Extract info from the data */
    const creator = data.get("creator")
    const category = data.get("category")
    const title = data.get("title")
    const description = data.get("description")
    const price = data.get("price")

    /* Get an array of uploaded photos */
    const photos = data.getAll("workPhotoPaths")

    const workPhotoPaths = []

    /* Process and store each photo  */
    for (const photo of photos) {
      // Read the photo as an ArrayBuffer
      const bytes = await photo.arrayBuffer()

      // Convert it to a Buffer
      const buffer = Buffer.from(bytes)

      // Define the destination path for the uploaded file
      const workImagePath = `${uploadDirectory}/${photo.name}`; //SSC

      // Write the buffer to the filessystem
      await writeFile(workImagePath, buffer);

      // Store the file path in an array
      workPhotoPaths.push(`/uploads/tests/${photo.name}`); //SSC
    }

    /* Create a new Work */
    const newWork = new Work({
      creator, category, title, description, price, workPhotoPaths
    })

    await newWork.save()

    return new Response(JSON.stringify(newWork), { status: 200 })
  }
  catch (err) {
    console.log(err)
    return new Response("Failed to create a new Work", { status: 500 })
  }
}