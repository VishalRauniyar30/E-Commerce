import { Router } from 'express'
import { addProduct, deleteProduct, getAllProducts } from './controllers/product.controllers.js'


const productRouter = Router()


productRouter.post('/addproduct', addProduct)
productRouter.post('/removeproduct', deleteProduct)

productRouter.get('/allproducts', getAllProducts)


export default productRouter