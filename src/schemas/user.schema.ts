import { z } from 'zod';

export const userSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string()
});