import multer, { Field,FileFilterCallback } from "multer";
import { Request } from "express";

const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

export const uploadMulter = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter
});

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
  },
];
