class ApiError extends Error {
constructor(
    statusCode,
    message="something went wrong",
    error=[],
    stack=""
) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.error = error;
    
    if (stack) {
    this.stack = stack;
} 
else {
    this.stack = "";
}
}

}

export default ApiError;
