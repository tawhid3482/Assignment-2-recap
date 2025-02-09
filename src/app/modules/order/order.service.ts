import { Orders } from '../order.model'
import { Products } from '../Products.model'
import { TOrder } from './order.interface'

const createOrderIntoDB = async (orderData: TOrder) => {
  const product = await Products.findById(orderData.productId)
  if (!product) {
    throw new Error('Product not found')
  }
  if (product.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory')
  }
  const result = await Orders.create(orderData)
  product.inventory.quantity -= orderData.quantity
  product.inventory.inStock = product.inventory.quantity > 0
  await product.save()
  return result
}
const getAllOrderIntoDB = async () => {
  const result = await Orders.find()
  return result
}
const getOrderByEmailIntoDB = async (email: string) => {
  const allOrders = await Orders.findOne({ email })
  return allOrders
}

export const orderServices = {
  createOrderIntoDB,
  getAllOrderIntoDB,
  getOrderByEmailIntoDB,
}
