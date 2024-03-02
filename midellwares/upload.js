import multer from "multer";

const upload = multer({ dest: 'public/avatars' });

export default upload;
