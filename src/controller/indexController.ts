import { Request, Response } from "express";

const indexController = (_req: Request, res: Response) => {
  res.status(200).json({
    name: "TS-BoilerplateX",
    version: "3.0.0",
    description: "Production-ready TypeScript + Express.js boilerplate",
    documentation: {
      health: "GET /api/health",
      users: {
        list: "GET /api/users?page=1&limit=10&role=user&isActive=true",
        stats: "GET /api/users/stats",
        getById: "GET /api/users/:id",
        create: "POST /api/users",
        update: "PUT /api/users/:id",
        delete: "DELETE /api/users/:id",
      },
    },
  });
};

export default { indexController };
