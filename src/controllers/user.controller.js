import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // Registration logic here
  // validation - not empty
  // check if user already exists: username, email
  // check for images and avatar
  // upload them to cloudinary
  // create user object - entry in db
  // remove password and refresh token field from response
  // return response

  const {fullName, email, username, password} = req.body
  console.log("User registration data:", { username, email, fullName });

  if([fullName, email, username, password].some((field) =>  field?.trim()==="")){
   throw new ApiError(400, "All fields are required");
  }  

  const existedUser =User.findOne( {
    $or:[{userName},{email}]
  })
  if(existedUser){
    throw new ApiError(409, "User already exists with this username or email");
  }

  const avatarLocalPath= req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
  throw new ApiError(400, "Avatar image is required");
}
// Upload imags to cloudinarty
const avatar=await uploadOnCloudinary(avatarLocalPath)
const coverImage=await uploadOnCloudinary(coverImageLocalPath)
if(!avatar){
  throw new ApiError(500, "Avatar image upload failed");
}
const user= await User.create({
  fullName,
  avatar:avatar.url,
  coverImage: coverImage?.url || "",
  email,
  password,
  userName,
})
const createUser = await User.findById(user._id).select("-password -refreshToken");

if(!createUser){
  throw new ApiError(500, "Something went wrong while registering the User");
}

return res.status(201).json(new ApiResponse(201, createUser, "User registered successfully"));
});


export {registerUser}
