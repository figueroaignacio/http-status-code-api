// Types
import type { NewStatusCode } from "@/db/schema";

// Utils
import { AppError } from "@/middleware/error-handler";

// Repos
import { categoriesRepository } from "@/repositories/categories.repository";
import { statusCodesRepository } from "@/repositories/status-code.repository";

export class StatusCodesService {
  async getAll() {
    return await statusCodesRepository.findAll();
  }

  async getById(id: number) {
    const statusCode = await statusCodesRepository.findById(id);

    if (!statusCode) {
      throw new AppError(404, "Status code not found");
    }

    return statusCode;
  }

  async getByCode(code: number) {
    const statusCode = await statusCodesRepository.findByCode(code);

    if (!statusCode) {
      throw new AppError(404, "Status code not found");
    }

    return statusCode;
  }

  async create(data: NewStatusCode) {
    const categoryExists = await categoriesRepository.existsById(
      data.categoryId
    );

    if (!categoryExists) {
      throw new AppError(400, "Category does not exist");
    }

    const codeExists = await statusCodesRepository.existsByCode(data.code);

    if (codeExists) {
      throw new AppError(400, "Status code already exists");
    }

    return await statusCodesRepository.create(data);
  }

  async updateStatusCode(id: number, data: Partial<NewStatusCode>) {
    const exists = await statusCodesRepository.findById(id);

    if (!exists) {
      throw new AppError(404, "Status code not found");
    }

    if (data.categoryId) {
      const categoryExists = await categoriesRepository.existsById(
        data.categoryId
      );
      if (!categoryExists) {
        throw new AppError(400, "Category does not exist");
      }
    }

    if (data.code && data.code !== exists.code) {
      const codeExists = await statusCodesRepository.existsByCode(data.code);
      if (codeExists) {
        throw new AppError(400, "Status code already exists");
      }
    }

    return await statusCodesRepository.update(id, data);
  }

  async delete(id: number) {
    const deleted = await statusCodesRepository.delete(id);

    if (!deleted) {
      throw new AppError(404, "Status code not found");
    }

    return deleted;
  }
}

export const statusCodesService = new StatusCodesService();
