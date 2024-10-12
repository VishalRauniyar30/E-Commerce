import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import multer from 'multer';
import path from 'path';
import cors from 'cors';



const app = express();


app.use(express.json());
app.use(cors());

const ConnectionUrl = process.env.CONNECTION_URL;
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://NiketRauniyar:ArthurMorgan1873@cluster0.a5pii.mongodb.net/e-commerce');


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


app.use('/images', express.static('upload/images'));


app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success : 1,
        image_url : `http://localhost:${port}/images/${req.file.filename}`
    });
});



const Product = mongoose.model("Product", {
    id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    new_price : {
        type : Number,
        required : true
    },
    old_price : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    available : {
        type : Boolean,
        default : true
    }
})


app.post('/addproduct', async(req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0) {
        let last_product = products[products.length - 1];
        id = last_product.id + 1;
    } else {
        id = 1;
    };
    const product = new Product({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category : req.body.category,
        new_price : req.body.new_price,
        old_price : req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log('saved');
    
    res.json({
        success : true,
        name : req.body.name
    });
})

app.post('/removeproduct', async(req, res) => {
    await Product.findOneAndDelete({ id : req.body.id });
    console.log("removed");
    res.json({
        success : true,
        name : req.body.name,
    });  
})

app.get('/allproducts', async(req, res) => {
    let products = await Product.find({});
    // console.log("All Products Fetched");
    res.send(products);
})


const User = mongoose.model("User", {
    name : {
        type : String,
    },
    email : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
    },
    cartData : {
        type : Object,
    },
    date : {
        type : Date,
        default : Date.now
    }
})

app.post('/signup', async (req, res) => {
    let check  = await User.findOne({ email : req.body.email });
    if(check) {
        return res.status(400).json({ success : false, errors : "User Already Exists" });
    }
    let cart = {};
    for (let i = 0; i < 300 ; i++) {
        cart[i] = 0;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User({
        name : req.body.username,
        email : req.body.email,
        password : hashedPassword,
        cartData : cart
    });
    await user.save();
    const data = {
        user : {
            id : user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success : true, token });
})


app.post('/login', async(req, res) => {
    let user = await User.findOne({ email : req.body.email });
    if(user) {
        // const passCompare = req.body.password === user.password;
        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if(passCompare) {
            const data = {
                user : {
                    id : user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success : true, token });
        }
        else {
            res.json({ success : false, errors : 'Wrong Password' });
        }
    }
    else {
        res.json({ success : false, errors : 'Wrong Email-ID' });
    }
})

app.get('/newcollections', async(req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    // console.log("new Collection Fetched");
    res.send(newCollection);
});


app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category : 'women' });
    let popular_in_women = products.slice(2,8);
    // console.log("popular in Women Fetched");
    res.send(popular_in_women);
});

const fetchUser = async(req, res, next) => {
    const token = req.header('e-commerce');
    if(!token) {
        res.status(401).send({ errors : 'Please authenticate using valid token' });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            // console.log("User ID from token:", req.user.id);
            next();
        } catch (error) {
            console.log(error);
            res.status(401).send({ errors : "Please authenticate using a Valid token" });
        }
    }
}

app.post('/addtocart', fetchUser, async (req, res) => {
    console.log('Added', req.body.itemId);
    let userData = await User.findOne({ _id : req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id : req.user.id }, { cartData : userData.cartData });
    res.send({ success: true, operation : 'Added' });
    
});
app.post('/removefromcart', fetchUser, async(req, res) => {
    console.log("removed", req.body.itemId);
    
    let userData = await User.findOne({ _id: req.user.id });
    if(userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    } 
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send({ success: true, operation : 'Removed' });

});
app.post('/getcart', fetchUser, async(req, res) => {
    console.log('Get Cart');

    const userData = await User.findOne({ _id : req.user.id });
    res.json(userData.cartData);
});

app.listen(port, (error) => {
    if(!error) {
        console.log(`server running on port : ${port}`);
    }
    else {
        console.log(`Error : ${error}`);
        
    }
})