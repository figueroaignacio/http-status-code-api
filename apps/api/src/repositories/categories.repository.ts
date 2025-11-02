import { db } from "@/db";
import { categories, type NewCategory, statusCodes } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export class CategoriesRepository {
  async findAll() {
    return await db.select().from(categories).orderBy(categories.id);
  }

  async findById(id: number) {
    const [result] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));

    return result || null;
  }

  async findByIdWithCodes(id: number) {
    const category = await this.findById(id);
    if (!category) return null;

    const codes = await db
      .select()
      .from(statusCodes)
      .where(eq(statusCodes.categoryId, id))
      .orderBy(statusCodes.code);

    return {
      ...category,
      codes,
    };
  }

  async create(data: NewCategory) {
    const [result] = await db.insert(categories).values(data).returning();
    return result;
  }

  async update(id: number, data: Partial<NewCategory>) {
    const [result] = await db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();

    return result || null;
  }

  async delete(id: number) {
    const [result] = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();
    return result || null;
  }

  async existsById(id: number) {
    const [result] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.id, id));
    return !!result;
  }
}

export const categoriesRepository = new CategoriesRepository();
