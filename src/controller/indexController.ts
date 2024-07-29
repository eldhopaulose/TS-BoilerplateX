import { Request, Response } from "express";

const indexController = (_req: Request, res: Response) => {
  const data = [{ id: 1, name: "Example" }];
  res.apiResponse("Data fetched successfully", true, 200, data);
};
// Example route

export default { indexController };
