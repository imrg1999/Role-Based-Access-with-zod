export const roleMiddleware = (...allowedRoles) => {
    return(req,res,next) => {
        try{
        if(!allowedRoles.includes(req.user.role)) {
         return res.status(403).json({
                success: false,
                message: "Access Denied"
            })
        }
        next()
     }catch(error) {
        res.status(403).json({
            success: false,
            message: "Login request denied"
        })
     }
    }
}