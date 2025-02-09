import express from 'express'
import { orderControllers } from './order.controller'
const router = express.Router()

router.post('/orders',orderControllers.createOrders)
router.get('/orders',orderControllers.getOrders)

export const orderRoute = router