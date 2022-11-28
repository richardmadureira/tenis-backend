import multer from 'multer';

export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.DIR_AVATARS);
    },
    filename: function (req, file, cb) {
      const fileName = `${new Date().getTime()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
});
