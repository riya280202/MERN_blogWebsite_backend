const Comment = require('../model/comment.js');


exports.newComment = async (req,res) => {
 try{
    const comment = await new Comment(req.body);
        comment.save();

        res.status(200).json('Comment saved successfully');
 } catch(error){
    return res.status(500).json(error)
 }

}

exports.getComments = async(req,res) => {
   try {
      const comments = await Comment.find({ postId: req.params.id });
      
      res.status(200).json(comments);
  } catch (error) {
      res.status(500).json(error)
  }
}


exports.deleteComment = async (request, response) => {
   try {
       await Comment.findByIdAndDelete(request.params.id);
      

       response.status(200).json('comment deleted successfully');
   } catch (error) {
       response.status(500).json(error)
   }
}