import { model, Schema } from 'mongoose'
import { TOrder } from './order/order.interface'

const OrdersSchema = new Schema<TOrder>({
  email: { type: String, required: [true, 'email is required'] },
  productId: { type: String, required: [true, 'productId is required'] },
  price: { type: Number, required: [true, 'price is required'] },
  quantity: { type: Number, required: [true, 'quantity is required'] },
})

export const Orders = model<TOrder>('Orders', OrdersSchema)
