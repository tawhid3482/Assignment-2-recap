import { Types } from 'mongoose'
import { Products } from '../Products.model'
import { TProduct } from './Products.interface'

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Products.create(productData)
  return result
}

const getAllProductsFromDB = async () => {
  const result = await Products.find()
  return result
}

const getSingleProductFromDB = async (_id: string) => {
  const result = await Products.findOne({ _id })
  //   const result = await Products.aggregate([{ $match: { _id } }])
  return result
}

const updateProductIntoDB = async (
  _id: string,
  updatedData: Partial<TProduct>,
) => {
  if (!Types.ObjectId.isValid(_id)) {
    throw new Error('invalid product id')
  }

  const result = await Products.findByIdAndUpdate(
    _id,
    { $set: updatedData },
    { new: true, runValidators: true },
  )
  if (!result) {
    throw new Error('Product not found')
  }
  return result
}

const deleteProductFromDB = async (_id: string) => {
  const result = await Products.updateOne({ _id }, { isDeleted: true })
  return result
}

const searchProductsFromDB = async (searchTerm: string) => {
  const allProducts = await Products.find()
  const filteredProducts = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  )

  return filteredProducts
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  searchProductsFromDB,
}
