//middleware
errorHandler = (error, request, response, next)=>{
    return response.status(error.status || 500).json({
        error:{
            message: error.message || "Oops Something went wrong"
        }
    })
}

module.exports = errorHandler;

//generic function that will respond with status of Error