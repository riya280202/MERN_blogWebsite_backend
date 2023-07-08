const express = require("express");
const { signup, login } = require("../controllers/user-controller");
const { uploadImage, getImage } = require("../controllers/image-controller");
const { authenticateToken } = require('../controllers/jwt-controller.js');
const {newComment, getComments, deleteComment} = require("../controllers/comment-controller")

const router = express.Router();

const upload = require("../utils/upload");
const { createPost, getAllPosts, getPost, updatePost, deletePost } = require("../controllers/post-controller");

router.post("/signup", signup)
router.post("/login", login)
router.post("/file/upload",upload.single("file"), uploadImage)
router.get("/file/:filename", getImage)

router.post("/create",authenticateToken, createPost)
router.get("/posts", authenticateToken, getAllPosts);
router.get("/post/:id", authenticateToken, getPost);

router.put("/update/:id", authenticateToken, updatePost)
router.delete('/delete/:id', authenticateToken, deletePost);

router.post("/comment/new", authenticateToken,newComment )
router.get("/comments/:id", authenticateToken, getComments)
router.delete("/comment/delete/:id", authenticateToken, deleteComment)

module.exports = router;