import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

import { addProduct, addProductToCart, deleteProduct, getAllProducts, getCart, getNewCollections, getPopularInWomen, removeProductFromCart } from './controllers/product.controllers.js';
import { signin, signup } from "./controllers/user.controllers.js";
import fetchUser from './middlewares/user.middlewares.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Express App is Running");
});

const storage = multer.diskStorage({
    destination : './upload/images',
    filename : (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    } 
});

const upload = multer({
    storage : storage
});

//Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));


app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success : 1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
    });
});

app.post('/addproduct', addProduct);
app.post('/removeproduct', deleteProduct);

app.get('/allproducts', getAllProducts);

app.post('/signup', signup);
app.post('/login', signin);

app.get('/newcollections', getNewCollections);
app.get('/popularinwomen', getPopularInWomen);

app.post('/addtocart', fetchUser, addProductToCart);
app.post('/removefromcart', fetchUser, removeProductFromCart);
app.post('/getcart', fetchUser, getCart);





//Database Connection With MongoDB
const ConnectionUrl = process.env.CONNECTION_URL;
const port = process.env.PORT || 5000;


mongoose.connect(ConnectionUrl)
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(port, () => console.log(`Server Running on Port : ${port}`))
})
.catch((error) => console.log(error));

