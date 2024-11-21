const cloudinary = require("../cloudinary/cloudinary");
const addImageToCludinary = async (image) => {
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataUri = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.uploader.upload(dataUri);
  return uploadResponse;
};

module.exports = addImageToCludinary;
