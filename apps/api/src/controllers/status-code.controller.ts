// Express
import type { NextFunction, Request, Response } from "express";

// Service
import { statusCodesService } from "@/services/status-code.service";

export class StatusCodesController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const codes = await statusCodesService.getAll();
      res.json({ status: "success", data: codes });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const code = await statusCodesService.getById(id);
      res.json({ status: "success", data: code });
    } catch (error) {
      next(error);
    }
  }

  async getByCode(req: Request, res: Response, next: NextFunction) {
    try {
      const code = parseInt(req.params.code);
      const statusCode = await statusCodesService.getByCode(code);
      res.json({ status: "success", data: statusCode });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCode = await statusCodesService.create(req.body);
      res.status(201).json({ status: "success", data: newCode });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const updatedCode = await statusCodesService.updateStatusCode(
        id,
        req.body
      );
      res.json({ status: "success", data: updatedCode });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await statusCodesService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const statusCodesController = new StatusCodesController();
