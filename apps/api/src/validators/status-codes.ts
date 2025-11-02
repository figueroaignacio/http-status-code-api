import { z } from "zod";

export const createStatusCodeSchema = z.object({
  code: z.number().int().min(100).max(599),
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  categoryId: z.number().int().positive(),
});

export const updateStatusCodeSchema = z.object({
  code: z.number().int().min(100).max(599).optional(),
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).optional(),
  categoryId: z.number().int().positive().optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1),
  color: z.string().min(1).max(50),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(1).optional(),
  color: z.string().min(1).max(50).optional(),
});
