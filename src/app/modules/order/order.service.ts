import { Orders } from '../order.model'
import { TOrder } from './order.interface'

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Orders.create(orderData)
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
