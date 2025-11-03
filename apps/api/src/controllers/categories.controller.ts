import { NextFunction, Request, Response } from "express";

// Services
import { categoriesService } from "@/services/categories.service";

export class CategoriesController {
  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoriesService.getAll();
      res.json({
        status: "success",
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const category = categoriesService.getById(id);
      res.json({
        status: "success",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async getWithCodes(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const category = categoriesService.getWithCodes(id);
      res.json({
        status: "success",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCategory = await categoriesService.create(req.body);
      res.status(201).json({
        status: "success",
        data: newCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const updatedCategory = await categoriesService.update(id, req.body);
      res.json({
        status: "success",
        data: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await categoriesService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const categoriesController = new CategoriesController();
