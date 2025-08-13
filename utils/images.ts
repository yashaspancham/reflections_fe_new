import { toasting } from "@/utils/toast";

const imageFormats: string[] = [
  // Raster formats
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "tif",
  "webp",
  "heif",
  "heic",
  "ico",

  // Vector formats
  "svg",
  "eps",
  "pdf",
  "ai",

  // Other / specialized formats
  "exr",
  "raw", // generic raw
  "cr2",
  "nef",
  "arw",
  "pbm",
  "pgm",
  "ppm",
  "flif",
];

export const iSImage = (fileExt: string | undefined): boolean => {
  if (fileExt === undefined || fileExt === null) {
    toasting("NO file extension found", "error");
    return false;
  }
  if (imageFormats.includes(fileExt)) return true;
  toasting("File is not image","error")
  return false;
};
