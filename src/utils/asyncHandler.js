const asyncHandler = (requestHandeler)=>{
   (req,res,next)=>{
    Promise.resolve(
    requestHandeler(req,res,next)
    ).catch((err)=>next(err))
   }
}

export {asyncHandler};

/*const asyncHandler =()={};
const asyncHandler = (func) =>{()=>()}; you can lso omitte the 2nd bracket
cont asyncHandler = (func) => {async () =>{}}*/

// the try-catch syntax

/*const asyncHandler =(fn)=> async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
}*/