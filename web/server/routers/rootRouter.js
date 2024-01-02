import { getProducts } from "../controllers/productController.js"

const rootRouter = (app) => {
  app.use('/api/products', getProducts)
  
}

export default rootRouter
