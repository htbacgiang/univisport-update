import multiparty from "multiparty";
import cloudinary from "cloudinary";
import { mongooseConnect } from "../../lib/mongoose";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env.CLOUD_API_SECRET,
});

export default async function handle(req, res) {
  await mongooseConnect();

  const form = new multiparty.Form({
    maxFilesSize: 100 * 1024 * 1024, // 🔥 100MB total
  });

  try {
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    if (!files?.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 🔥 upload song song (nhanh hơn nhiều)
    const uploadPromises = files.file.map((file) =>
      cloudinary.v2.uploader.upload(file.path, {
        folder: "univisport",
        public_id: `file_${Date.now()}_${Math.random()}`,
        resource_type: "auto",
      })
    );

    const results = await Promise.all(uploadPromises);

    const links = results.map((r) => r.secure_url);

    return res.json({ links });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};