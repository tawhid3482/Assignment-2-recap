import { Request, Response, NextFunction } from 'express'
import { orderServices } from './order.service'
import orderValidationSchema from './order.validation'

const createOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orderData = req.body
    const zodParseData = orderValidationSchema.parse(orderData)
    const result = await orderServices.createOrderIntoDB(zodParseData)
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (error) {
    next(error) // Pass errors to Express error-handling middleware
  }
}

const getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = req.query.email as string
    let result
    if (email) {
      result = await orderServices.getOrderByEmailIntoDB(email)

      if (!result) {
        res.status(404).json({
          success: false,
          message: `Order not found`,
        })
        return
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
  } catch (error) {
    next(error) // Pass errors to Express error-handling middleware
  }
}

export const orderControllers = {
  createOrders,
  getOrders,
}
