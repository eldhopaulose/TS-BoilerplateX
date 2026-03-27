import { Request, Response } from "express";
import logger from "../utils/logger";
import * as UserModel from "../models/user.model";

/**
 * User Controller
 * Handles all user-related HTTP operations with structured logging.
 */

// ─── GET /api/users ──────────────────────────────────────────────────────────
const getAll = (req: Request, res: Response): void => {
  const { page = 1, limit = 10, role, isActive } = req.query as {
    page?: number;
    limit?: number;
    role?: string;
    isActive?: string;
  };

  let users = UserModel.findAll();

  // Filter by role
  if (role) {
    users = users.filter((u) => u.role === role);
  }

  // Filter by active status
  if (isActive !== undefined) {
    const active = isActive === "true";
    users = users.filter((u) => u.isActive === active);
  }

  // Pagination
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedUsers = users.slice(startIndex, endIndex);

  logger.info(
    { requestId: req.id, total: users.length, page: pageNum, limit: limitNum },
    "Users fetched successfully",
  );

  res.status(200).json({
    success: true,
    data: paginatedUsers,
    pagination: {
      total: users.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(users.length / limitNum),
      hasNextPage: endIndex < users.length,
      hasPrevPage: pageNum > 1,
    },
  });
};

// ─── GET /api/users/:id ──────────────────────────────────────────────────────
const getById = (req: Request, res: Response): void => {
  const id = req.params.id as string;
  const user = UserModel.findById(id);

  if (!user) {
    logger.warn({ requestId: req.id, userId: id }, "User not found");
    res.status(404).json({
      success: false,
      error: "User not found",
      message: `No user exists with ID: ${id}`,
    });
    return;
  }

  logger.info({ requestId: req.id, userId: id }, "User fetched");
  res.status(200).json({ success: true, data: user });
};

// ─── POST /api/users ─────────────────────────────────────────────────────────
const create = (req: Request, res: Response): void => {
  const { name, email, age, role = "user", isActive = true } = req.body;

  // Check for duplicate email
  const existing = UserModel.findByEmail(email);
  if (existing) {
    logger.warn({ requestId: req.id, email }, "Duplicate email attempt");
    res.status(409).json({
      success: false,
      error: "Conflict",
      message: `A user with email '${email}' already exists`,
    });
    return;
  }

  const user = UserModel.create({ name, email, age, role, isActive });

  logger.info({ requestId: req.id, userId: user.id, email }, "User created");
  res.status(201).json({ success: true, data: user });
};

// ─── PUT /api/users/:id ──────────────────────────────────────────────────────
const update = (req: Request, res: Response): void => {
  const id = req.params.id as string;

  // Check if email is being changed to one that already exists
  if (req.body.email) {
    const existingWithEmail = UserModel.findByEmail(req.body.email);
    if (existingWithEmail && existingWithEmail.id !== id) {
      logger.warn({ requestId: req.id, email: req.body.email }, "Email already in use");
      res.status(409).json({
        success: false,
        error: "Conflict",
        message: `Email '${req.body.email}' is already in use by another user`,
      });
      return;
    }
  }

  const user = UserModel.update(id, req.body);

  if (!user) {
    logger.warn({ requestId: req.id, userId: id }, "User not found for update");
    res.status(404).json({
      success: false,
      error: "User not found",
      message: `No user exists with ID: ${id}`,
    });
    return;
  }

  logger.info({ requestId: req.id, userId: id }, "User updated");
  res.status(200).json({ success: true, data: user });
};

// ─── DELETE /api/users/:id ───────────────────────────────────────────────────
const remove = (req: Request, res: Response): void => {
  const id = req.params.id as string;
  const deleted = UserModel.remove(id);

  if (!deleted) {
    logger.warn({ requestId: req.id, userId: id }, "User not found for deletion");
    res.status(404).json({
      success: false,
      error: "User not found",
      message: `No user exists with ID: ${id}`,
    });
    return;
  }

  logger.info({ requestId: req.id, userId: id }, "User deleted");
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

// ─── GET /api/users/stats ────────────────────────────────────────────────────
const getStats = (req: Request, res: Response): void => {
  const users = UserModel.findAll();

  const stats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    inactive: users.filter((u) => !u.isActive).length,
    byRole: {
      admin: users.filter((u) => u.role === "admin").length,
      user: users.filter((u) => u.role === "user").length,
      moderator: users.filter((u) => u.role === "moderator").length,
    },
    averageAge: users.length > 0
      ? Math.round(users.reduce((sum, u) => sum + u.age, 0) / users.length)
      : 0,
  };

  logger.info({ requestId: req.id }, "User stats fetched");
  res.status(200).json({ success: true, data: stats });
};

export default { getAll, getById, create, update, remove, getStats };
