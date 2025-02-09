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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    })
  }
}

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string | undefined
    let result
    if (email) {
      result = await orderServices.getOrderByEmailIntoDB(email)

      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Order not found`,
        })
      }
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}

export const orderControllers = {
  createOrders,
  getOrders,
}
