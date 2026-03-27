import { Router } from "express";
import userController from "../controller/userController";
import { validate, strictRateLimiter } from "../middleware";
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
  listUsersSchema,
} from "../schemas/user.schema";

const router = Router();

/**
 * @route   GET /api/users
 * @desc    Get all users with pagination & filtering
 * @query   page, limit, role, isActive
 * @access  Public
 */
router.get("/", validate(listUsersSchema), userController.getAll);

/**
 * @route   GET /api/users/stats
 * @desc    Get user statistics (counts by role, active/inactive, avg age)
 * @access  Public
 */
router.get("/stats", userController.getStats);

/**
 * @route   GET /api/users/:id
 * @desc    Get a single user by ID
 * @param   id - UUID of the user
 * @access  Public
 */
router.get("/:id", validate(userIdParamSchema), userController.getById);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @body    { name, email, age, role?, isActive? }
 * @access  Public (strict rate limit applied)
 */
router.post("/", strictRateLimiter, validate(createUserSchema), userController.create);

/**
 * @route   PUT /api/users/:id
 * @desc    Update an existing user
 * @param   id - UUID of the user
 * @body    { name?, email?, age?, role?, isActive? }
 * @access  Public
 */
router.put("/:id", validate(updateUserSchema), userController.update);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user by ID
 * @param   id - UUID of the user
 * @access  Public (strict rate limit applied)
 */
router.delete("/:id", strictRateLimiter, validate(userIdParamSchema), userController.remove);

export default router;
