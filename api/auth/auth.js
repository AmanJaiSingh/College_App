import jwt from "jsonwebtoken";
// import collegeModal from "../modal/collegeModal.js";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  console.log(req.headers);
  if (authHeader) {
    const token = authHeader;
    console.log(token);
    jwt.verify(authHeader, process.env.JWT_SEC, (err, user) => {
      if (err) {
        console.log(err);
        res.status(403).json({ message: "Token is not valid", token });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    console.log("not verified-----------------------");
    return res.status(401).json("You Are not verified");
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!54");
    }
  });
};

const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      var clg = req.user.created_clg;
      const ans = clg.find((element) => element == req.params.id);
      if (ans) {
        next();
      } else {
        console.log(ans);
        res.status(403).json("You are not allowed to do that!54");
      }
    }
  });
};

export {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
};
