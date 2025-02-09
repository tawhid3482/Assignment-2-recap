import express, { Application, Request, Response } from 'express'
import { ProductRoutes } from './app/modules/Products/Products.route'
import cors from 'cors'
import { orderRoute } from './app/modules/order/order.route'
const app:Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api', ProductRoutes)
app.use('/api', orderRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World devs!')
})

export default app
