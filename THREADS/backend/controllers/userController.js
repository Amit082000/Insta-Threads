import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

const signupUser = async(req, res) => {
    try{
        const {name, email, username, password} = req.body;
        const user = await User.findOne({$or:[{email},{username}]});

        if(user){
            return res.status(400).json({message: "User already exist please login"});
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
                username: newUser.username
            })
        } else{
            res.status(400).json({message: "Invalid user data"});

        }

    } catch(err){
        res.status(500).json({ message: err.message});
        console.log(err.message);
    }

}

const loginUser = async(req, res) => {

    try{
        const {username, password} = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({message: "invalid user or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        });




    }catch(err){
        res.status(500).json({ message: err.message});
        console.log(err.message);
    }

}

const logoutUser = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:1});
        res.status(200).json({ message: "User Logout successfully"});

    }catch(err){
        res.status(500).json({ message: err.message});
        console.log(err.message);
    }

}

const followUnfollowUser = async (req, res) => {
    try{
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id == req.user._id) return res.status(400).json({message: "cannot follow or unfollow yourself"});

        if(!userToModify || !currentUser)  return res.status(400).json({message: "user not found"});

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
        res.status(500).json({ message: err.message});
        console.log(err.message);
    }

}

export {signupUser, loginUser, logoutUser, followUnfollowUser};
