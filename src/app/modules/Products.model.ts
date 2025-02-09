import { model, Schema } from 'mongoose'
import { TInventory, TProduct, TVariants } from './Products/Products.interface'

const VariantsSchema = new Schema<TVariants>({
  type: { type: String, required: [true, 'type is required'] },
  value: { type: String, required: [true, 'value is required'] },
})

const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: [true, 'quantity is required'] },
  inStock: { type: Boolean, required: [true, 'inStock is required'] },
})

const ProductsSchema = new Schema<TProduct>({
  name: { type: String, required: [true, 'name is required'] },
  description: { type: String, required: [true, 'description is required'] },
  price: { type: Number, required: [true, 'price is required'] },
  category: { type: String, required: [true, 'name is required'] },
  tags: { type: [String], required: [true, 'tags are required'] },
  variants: {type:[VariantsSchema], required:true},
  inventory: {type:InventorySchema, required:true},
  isDeleted:{type:Boolean, default:false}
})

export const Products = model<TProduct>('Products', ProductsSchema)
