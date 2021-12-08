import multer, { Field } from "multer";
import path from "path";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const uploadMulter = multer({ storage });

export const removeImages = async (paths: string[]) => {
  for (const path of paths) {
    await fs.rm(path);
  }
};

export const getPaths = (files: { [fieldname: string]: Express.Multer.File[] }): string[] => {
  if (!files) throw new Error("There are not images to save");

  const keys = ['image1','image2','image3'];
  const images = [];
  
  for (const key of keys) {
    const file = files[key];
    if (file) {
      images.push(file[0]);
    }
  }

  return images.map((file) => file.path);
};

export const imageFields: Field[] = [
  {
    name: "image1",
    maxCount: 1,
  },
  {
    name: "image2",
    maxCount: 1,
  },
  {
    name: "image3",
    maxCount: 1,
  }
];
