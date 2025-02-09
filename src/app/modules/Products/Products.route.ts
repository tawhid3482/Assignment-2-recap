import express from 'express'
import { ProductControllers } from './Products.controller'
const router = express.Router()

router.post('/products', ProductControllers.createProducts)
router.get('/products', ProductControllers.getAllProducts)
router.get('/products/:productId', ProductControllers.getSingleProduct)
router.put('/products/:productId', ProductControllers.updatedProduct)
router.delete('/products/:productId', ProductControllers.deleteProduct)

export const ProductRoutes = router
