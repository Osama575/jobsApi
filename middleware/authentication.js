const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');


const authenticate = async (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
   const token = authHeader.split(' ')[1];
   
   try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = {userId: decoded.userid, name: decoded.name};
       next();
    } catch (err) { 
        throw new UnauthenticatedError('Authentication invalid');
   }

}

module.exports = authenticate;