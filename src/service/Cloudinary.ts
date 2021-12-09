import { v2 } from "cloudinary";
import { IImage } from "../components/image/IImageStructure";
import env from "../config/env";
import DatauriParser from 'datauri/parser';
import path from 'path';

const parser = new DatauriParser();

v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

const formatBufferTo64 = (file: Express.Multer.File) => parser.format(path.extname(file.originalname).toString(), file.buffer);
const cloudinaryUpload = (file: string, folder: string) => v2.uploader.upload(file, {folder});


export const uploadOneImage = async (image: Express.Multer.File, folder: string) => {

  const file64 = formatBufferTo64(image);
  const uploadResult = await cloudinaryUpload(file64.content!, folder);
  return uploadResult;

};

export const uploadManyFiles = async (files: Express.Multer.File[], folder: string) => {
  const images: IImage[] = [];
  for (const file of files) {
    
    const result = await uploadOneImage(file, folder);
    images.push({
      key: result.public_id,
      url: result.url
    });
  }
  return images;
}