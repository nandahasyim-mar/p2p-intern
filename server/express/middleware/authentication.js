const { verifyToken } = require('../helpers/jwt');
const { userModel } = require('../models');

const authentication = async (req, res, next) => {
    const { access_token } = req.headers;

    try {
        if(!access_token)
            throw {name: 'Authentication Failed', message: "Authentication failed!", status: 401}
        else if(access_token)
            const decoded = verifyToken(access_token);
            const user = await userModel.findOne({
                $where: {
                    email: decoded.email
                }
            })

            if(!user)
                throw {name: 'Authentication Failed', message: "Authentication failed!", status: 401}
            else
                req.loggedInUser = decoded;
                next();
    } catch (error) {
        next(error)
    }
}

module.exports = authentication;
