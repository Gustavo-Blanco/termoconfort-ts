import { UploadApiResponse, v2 } from "cloudinary";
import { IImage } from "../components/image/IImageStructure";
import env from "../config/env";

v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadImage = async (
  path: string,
  folder: string
): Promise<UploadApiResponse> => {
  
  const upload = await v2.uploader.upload(path, {
    folder,
  });
  return upload;
};

export const formatUploadedImages = async (paths: string[], folder: string) => {
  const images: IImage[] = [];
  for (const path of paths) {
    const { url, public_id } = await uploadImage(path, folder);
    images.push({
      url: url,
      key: public_id,
    });
  }
  return images;
};
