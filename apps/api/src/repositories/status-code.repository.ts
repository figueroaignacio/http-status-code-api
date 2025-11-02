import { db } from "@/db";
import { categories, type NewStatusCode, statusCodes } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export class StatusCodesRepository {
  async findAll() {
    return await db
      .select({
        id: statusCodes.id,
        code: statusCodes.code,
        name: statusCodes.name,
        description: statusCodes.description,
        categoryId: statusCodes.categoryId,
        createdAt: statusCodes.createdAt,
        updatedAt: statusCodes.updatedAt,
        category: {
          id: categories.id,
          name: categories.name,
          description: categories.description,
          color: categories.color,
        },
      })
      .from(statusCodes)
      .leftJoin(categories, eq(statusCodes.categoryId, categories.id))
      .orderBy(statusCodes.code);
  }

  async findById(id: number) {
    const [result] = await db
      .select({
        id: statusCodes.id,
        code: statusCodes.code,
        name: statusCodes.name,
        description: statusCodes.description,
        categoryId: statusCodes.categoryId,
        createdAt: statusCodes.createdAt,
        updatedAt: statusCodes.updatedAt,
        category: {
          id: categories.id,
          name: categories.name,
          description: categories.description,
          color: categories.color,
        },
      })
      .from(statusCodes)
      .leftJoin(categories, eq(statusCodes.categoryId, categories.id))
      .where(eq(statusCodes.id, id));

    return result || null;
  }

  async findByCode(code: number) {
    const [result] = await db
      .select({
        id: statusCodes.id,
        code: statusCodes.code,
        name: statusCodes.name,
        description: statusCodes.description,
        categoryId: statusCodes.categoryId,
        createdAt: statusCodes.createdAt,
        updatedAt: statusCodes.updatedAt,
        category: {
          id: categories.id,
          name: categories.name,
          description: categories.description,
          color: categories.color,
        },
      })
      .from(statusCodes)
      .leftJoin(categories, eq(statusCodes.categoryId, categories.id))
      .where(eq(statusCodes.code, code));

    return result || null;
  }

  async create(data: NewStatusCode) {
    const [result] = await db.insert(statusCodes).values(data).returning();
    return result;
  }

  async update(id: number, data: Partial<NewStatusCode>) {
    const [result] = await db
      .update(statusCodes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(statusCodes.id, id))
      .returning();

    return result || null;
  }

  async delete(id: number) {
    const [result] = await db
      .delete(statusCodes)
      .where(eq(statusCodes.id, id))
      .returning();

    return result || null;
  }

  async existsByCode(code: number) {
    const [result] = await db
      .select({ id: statusCodes.id })
      .from(statusCodes)
      .where(eq(statusCodes.code, code));
    return !!result;
  }
}

export const statusCodesRepository = new StatusCodesRepository();
