import { z } from 'zod'

const variantsValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
})
const inventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
})

const productsValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantsValidationSchema),
  inventory: inventoryValidationSchema,
  isDeleted:z.boolean().optional()
})

export default productsValidationSchema
