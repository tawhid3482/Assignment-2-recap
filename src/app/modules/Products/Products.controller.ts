import { Request, Response } from 'express'
import { ProductServices } from './Products.service'
import productsValidationSchema from './Products.validation'

const createProducts = async (req: Request, res: Response) => {
  try {
    const product = req.body
    const zodParseData = productsValidationSchema.parse(product)
    const result = await ProductServices.createProductIntoDB(zodParseData)

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message:'Something went wrong',
      data: error,
    })
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string
    let result
    if (searchTerm) {
      result = await ProductServices.searchProductsFromDB(searchTerm)
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: result,
      })
    } else {
      result = await ProductServices.getAllProductsFromDB()
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully',
        data: result,
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message:  'Something went wrong',
      data: error,
    })
  }
}

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getSingleProductFromDB(productId)
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message:  'Something went wrong',
      data: error,
    })
  }
}

const updatedProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const updatedData = req.body
    const result = await ProductServices.updateProductIntoDB(
      productId,
      updatedData,
    )
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message:  'Something went wrong',
      data: error,
    })
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.deleteProductFromDB(productId)
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message:  'Something went wrong',
      data: error,
    })
  }
}

export const ProductControllers = {
  createProducts,
  getAllProducts,
  getSingleProduct,
  updatedProduct,
  deleteProduct,
}
