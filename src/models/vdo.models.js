import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vdoSchema = new Schema({
    videoFile:{
        type:String, // Cloudinary URL
        required:true,
    },
    thumbnail:{
        type:String, // Cloudinary URL
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type:Boolean,
        default:false,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{
    timestamps: true,
})

vdoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", vdoSchema);