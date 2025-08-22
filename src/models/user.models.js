import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt"
const userSchema =new Schema({
    username:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
      minlength: 3,
      maxlength: 100,
      index: true, // at mongoDB is we want to search quickly in an optimized way set index:true
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
    },
    fullname:{
      type:String,
      required:true,
      trim:true,
      index:true
    },
    avatar:{
      type:String, // Cloudinary URL
      required:true,
    },
    coverImage:{
      type:String, // Cloudinary URL
      required:true,
    },
    watchHistory:[
     {
      type: Schema.Types.ObjectId,
      ref: "Video",
     }
    ],
    password:{
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    refreshToken:{
      type:String,
    }
  },{
    timestamps: true,
  })

  userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bycrpt.hash(this.password, 10)
    next()
  })

  userSchema.methods.isPasswordCorrect = async function 
  (password){
    return await bycrpt.compare(password, this.password)
  }
  userSchema.methods.generateAccessToken = async function (){
    return jwt.sign({ 
      userId: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
     },
       process.env.ACCESS_TOKEN_SECRET, 
      {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
  }
  userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({ 
      userId: this._id,
      
     },
       process.env.REFRESH_TOKEN_SECRET, 
      {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
  }
export const User = mongoose.model("User", userSchema);