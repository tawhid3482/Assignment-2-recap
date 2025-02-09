import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  productId: z.string().min(1, { message: 'productId is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  quantity: z.number().int().min(1, { message: 'Quantity must be at least 1' }),
});

export default orderValidationSchema;
