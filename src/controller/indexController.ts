import { Request, Response } from "express";

const indexController = (_req: Request, res: Response) => {
  res.send("Welcome to the TS-BoilerplateX!");
};

export default { indexController };
