import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async(req,res) => {

    try{
        const {postedBy, text, img } = req.body;
        if(!postedBy || !text) {
            return res.status(400).json({ message: "cannot created post without all details"});
        }

        const user = await User.findById(postedBy);

        if(!user) return res.status(400).json({message: "user not found"});

        if(user._id.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "unauthorized create post"});

        }

        const maxLength = 500;
        if(text.length > maxLength) {
            return res.status(400).json({message :'text must be less than ${maxLength}  characters'});
        }


        const newPost = new Post({postedBy, text, img});

        await newPost.save();

        res.status(200).json({message: ' post created', newPost});

        
    }catch(err){
        res.status(500).json({ message: err.message});
        console.log(err.message);
   } 
}

const getPost = async(req,res) => {


    try{

        const post = await Post.findById(re.params.id);
        

        if(!post){
            return res.status(400).json({message: "post not found"});

        }

        res.status(200).json({post});

    }catch(err){
        res.status(500).json({ message: err.message});
        console.log(err.message);
   } 

}

const deletePost = async(req, res) => {

    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(400).json({message: "post not found"});

        }

        if(post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: "unauthorized to delete the post"});
        } 

        await Post.findByIdAndDelete(req.params.id);

        res.send(200).json({message: "Post deleted !!"});



    }catch(err){
        res.status(500).json({ message: err.message});
        console.log(err.message);
   } 

}

const likeUnlikePost =  async(req, res) => {

    try{

        const {id:postId} = req.params;

        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(400).json({message: "post not found"});

        }


        const userLikedPost = post.likes.include(userId);
        if(userLikedPost){
            await Post.updateOne({_id:postId},    {$pull: {likes: userId}});
            res.status(200).json({message: "post unliked"});
        } else {

            post.likes.push(userId);
            await post.save();
            res.status(200).json({message: "post liked"});  
            
        }


    }catch(err){
        res.status(500).json({ message: err.message});
        console.log(err.message);
   } 


}

const replyToPost = async(req, res) => {

    try{ 

        const {text} = req.body;
        const {id: postId} = req.params;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;

        if(!text){
            return res.status(400).json({message: "text required"});
        
           }
        
           const post = await Post.findById(postId);
        
           if(!post){
               return res.status(400).json({message: "post not found"});
        
           }
        
           const reply = {userId, text, userProfilePic, username};
        
           post.replies.push(reply);
           await post.save();
        
           res.status(200).json({ message: "reply added", post});
        

        
        
    }catch(err){
        res.status(500).json({ message: err.message});
        console.log(err.message);
   } 

}

const getFeedPosts = async(req, res) => {


    try{

        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user) return res.status(400).json({message: "user not found"});

        const following = user.following;

        const feedPosts = await Post.find({postedBy:{$in:following}}).sort({createdAt: -1});

        res.status(200).json({ feedPosts });    




    }catch(err){
        res.status(500).json({ message: err.message});
        console.log(err.message);
   } 

}


export { createPost , getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts };