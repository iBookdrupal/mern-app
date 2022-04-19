const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from the header
      token = req.headers.authorization.split(" ")[1];

      //verify the Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get User from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (eror) {
      console.log(eror);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
