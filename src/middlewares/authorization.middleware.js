const authorizationMiddleware = (accessRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      return next(new Error("Unauthorized access", { cause: 401 }));
    }

    if (!accessRoles.includes(req.user.role)) {
      return next(new Error("Unauthorized user", { cause: 403 }));
    }

    next();
  });
};

export default authorizationMiddleware;
