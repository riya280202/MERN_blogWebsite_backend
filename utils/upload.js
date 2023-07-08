const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const env = require("dotenv")

env.config();

const storage = new GridFsStorage({
    url: `mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0.jhcggji.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

module.exports =  multer({storage}); 