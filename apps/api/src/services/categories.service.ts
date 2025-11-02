// Types
import type { NewCategory } from "@/db/schema";

// Utils
import { AppError } from "@/middleware/error-handler";

// Repos
import { categoriesRepository } from "@/repositories/categories.repository";

export class CategoriesService {
  async getAll() {
    return await categoriesRepository.findAll();
  }

  async getById(id: number) {
    const category = await categoriesRepository.findById(id);

    if (!category) {
      throw new AppError(404, "Category not found");
    }

    return category;
  }

  async getWithCodes(id: number) {
    const category = await categoriesRepository.findByIdWithCodes(id);

    if (!category) {
      throw new AppError(404, "Category not found");
    }

    return category;
  }

  async create(data: NewCategory) {
    return await categoriesRepository.create(data);
  }

  async update(id: number, data: Partial<NewCategory>) {
    const updated = await categoriesRepository.update(id, data);

    if (!updated) {
      throw new AppError(404, "Category not found");
    }

    return updated;
  }

  async delete(id: number) {
    const deleted = await categoriesRepository.delete(id);

    if (!deleted) {
      throw new AppError(404, "Category not found");
    }

    return deleted;
  }
}

export const categoriesService = new CategoriesService();
