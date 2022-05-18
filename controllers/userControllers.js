const UserModel = require("../models/userModels");
const bcrypt = require("bcrypt");

// register new user
const registerNewUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    jobTitle,
    experienceLevel,
    location,
    about,
    skills,
    education,
    profilePicture,
    coverPicture,
    following,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !jobTitle ||
    !experienceLevel ||
    !location
  ) {
    return res.status(400).json({
      errorMessage: "Please provide all required fields",
    });
  } else {
    try {
      // generate new hashed password
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(password, salt);

      //create new user
      const newUser = await new UserModel({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hashedPassword,
        jobTitle: jobTitle,
        experienceLevel: experienceLevel,
        location: location,
        about: about,
        skills: skills,
        education: education,
        profilePicture: profilePicture,
        coverPicture: coverPicture,
        following: following,
      });

      // save new user and respond to client console
      const user = await newUser.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(401).json(err);
      console.log("registerNewUser userControllers error -->", err);
    }
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user already exists
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res
        .status(401)
        .json(
          "user not found, please register new user or enter details correctly"
        );
      return;
    }

    // check for password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json("wrong password, please enter correct password");
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log("loginUser userControllers error-->", err);
  }
};

// update user by id
const updateUser = async (req, res) => {
  // check if user id matches or is an admin
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    // if password is getting updated, need to encrypt
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(8);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json("updateUser change password -->", err);
      }
    }
    try {
      // update the rest
      await UserModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("User account has been updated");
    } catch (err) {
      res.status(500).json("updateUser findByIdAndUpdate -->", err);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
};

// delete user by id
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await UserModel.findByIdAndDelete(req.params.id);
      return res.status(200).json("User account has been deleted");
    } catch (err) {
      return res.status(500).json("deleteUser deleteOne -->", err);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
};

// get user by id - using query params allows use of two, userId or username
const getUserById = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
    // don't want to return password, so destruct and return the rest: ...other
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json("getUserById findById -->", err);
  }
};

// get user Friends
const getUserFriends = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    // promise all due to any number of friends
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );
    // create an array for friends
    let friendList = [];
    friends.map((friend) => {
      // only get the items required
      const { _id, profilePicture, firstName, lastName, jobTitle, username } =
        friend;
      friendList.push({
        _id,
        profilePicture,
        firstName,
        lastName,
        jobTitle,
        username,
      });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

// follow a user
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("User already follow's this user");
      }
    } catch (err) {
      res.status(500).json("followUser findById -->", err);
    }
  } else {
    res.status(403).json("User, cannot follow yourself");
  }
};

// unfollow a user
const unFollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("User has already unfollowed this user");
      }
    } catch (err) {
      res.status(500).json("unFollowUser findById -->", err);
    }
  } else {
    res.status(403).json("User, cannot unfollow yourself");
  }
};

module.exports = {
  registerNewUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserFriends,
  followUser,
  unFollowUser,
};
