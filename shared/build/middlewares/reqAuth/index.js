"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const notAuth_1 = require("../../errors/notAuth");
const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new notAuth_1.NotAuthorizedError();
    }
    next();
};
exports.requireAuth = requireAuth;
