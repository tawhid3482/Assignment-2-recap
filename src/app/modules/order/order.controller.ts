import { Request, Response } from 'express'
import { orderServices } from './order.service'
import orderValidationSchema from './order.validation'

const createOrders = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const zodParseData = orderValidationSchema.parse(orderData)
    const result = await orderServices.createOrderIntoDB(zodParseData)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    })
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string
    let result
    if (email) {
      result = await orderServices.getOrderByEmailIntoDB(email)
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      })
    } else {
      result = await orderServices.getAllOrderIntoDB()
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully',
        data: result,
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    })
  }
}

export const orderControllers = {
  createOrders,
  getOrders,
}
