import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import {v2 as cloudinary} from "cloudinary";

const getUserProfile = async(req,res) => {

    const {username} = req.params;
    
    try{
        const user = await User.findOne({username}).select("-password").select("-updatedAt");
        if(!user) return res.status(400).json({error: "user not found"});

        res.status(200).json(user)


        

    }catch(err){
        res.status(500).json({ error: err.message}); 
        console.log(err.message);

}
}

const signupUser = async(req, res) => {
    try{
        const {name, email, username, password} = req.body;
        const user = await User.findOne({$or:[{email},{username}]});

        if(user){
            return res.status(400).json({error: "User already exist please login"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            username: username,
            password: hashedPassword
        })
        await newUser.save();

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                password:""
            })
        } else{
            res.status(400).json({error: "Invalid user data"});

        }

    } catch(err){
        res.status(500).json({ error: err.message});
        console.log(err.message);
    }

}

const loginUser = async(req, res) => {

    try{
        const {username, password} = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "invalid user or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic,
        });

    }catch(err){
        res.status(500).json({ error: err.message});
        console.log(err.message);
    }

}

const logoutUser = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:1});
        res.status(200).json({ message: "User Logout successfully"});

    }catch(err){
        res.status(500).json({ error: err.message});
        console.log(err.message);
    }

}

const followUnfollowUser = async (req, res) => {
    try{
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id); 

        if(id == req.user._id.toString()) return res.status(400).json({error: "cannot follow or unfollow yourself"});

        if(!userToModify || !currentUser)  return res.status(400).json({error: "user not found"});

        const isFollowing = currentUser.following.include(id);

        if(isFollowing){


            await User.findByIdAndUpdate(req.user._id, {$pull : {following: id}});
            await User.findByIdAndUpdate(id, { $pull: {followers: req.user._id}});

            res.status(200).json({message: "user unfollowed"});

        } else{
            await User.findByIdAndUpdate(req.user._id, {$push : {following: id}});
            await User.findByIdAndUpdate(id, { $push: {followers: req.user._id}});

            res.status(200).json({message: "user followed"});
        }

    }catch(err){
        res.status(500).json({ error: err.message});
        console.log(err.message);
    }

}

const updateUser = async(req, res) => {


        const {name, email, username, password, bio} = req.body;
        let { profilePic } = req.body;
        const userId = req.user_id;

    try{

        let user = await User.findById(userId);
        if(!user) return res.status(400).json({error: "user not found"});

        if(req.params.id !== userId.toString()) {
            return res.status(400).json({ error: "You cannot update others profile"});           
        }

        if(password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        }

        if(profilePic){
            if(user.profilePic){
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split("."[0]));
            }
            
            const uploadedResponse = await cloudinary.uploader.upload(profilePic);
            profilePic = uploadedResponse.secure_url;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.username = username || user.username;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        user =  await user.save();


        user.password = null;

        res.status(200).json(user);

    }catch(err){
        res.status(500).json({ error: err.message});
        console.log(err.message);
    }

}



export {signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile};
