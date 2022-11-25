import multer from 'multer';

export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp/avatars');
    },
    filename: function (req, file, cb) {
      const fileName = `${new Date().getTime()}-${file.originalname}`;
      cb(null, fileName);
    }
  })
});
