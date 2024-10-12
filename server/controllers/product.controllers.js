import Product from "../models/product.models.js"
import User from "../models/user.models.js"

const addProduct = async(req, res) => {
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
};

const deleteProduct = async(req, res) => {
    await Product.findOneAndDelete({ id : req.body.id });
    console.log("removed");
    res.json({
        success : true,
        name : req.body.name,
    });  
};

const getAllProducts = async(_, res) => {
    let products = await Product.find({});
    // console.log("All Products Fetched");
    res.send(products);
};

const getNewCollections = async(_, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(1).slice(-8);
    // console.log("new Collection Fetched");
    res.send(newCollection);
}

const getPopularInWomen = async (_, res) => {
    let products = await Product.find({ category : 'women' });
    let popular_in_women = products.slice(2,8);
    // console.log("popular in Women Fetched");
    res.send(popular_in_women);
}

const addProductToCart = async (req, res) => {
    console.log('Added', req.body.itemId);
    let userData = await User.findOne({ _id : req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id : req.user.id }, { cartData : userData.cartData });
    res.send({ success: true, operation : 'Added' });
    
}


const removeProductFromCart = async(req, res) => {
    console.log("removed", req.body.itemId);
    
    let userData = await User.findOne({ _id: req.user.id });
    if(userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    } 
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send({ success: true, operation : 'Removed' });

}

const getCart = async(req, res) => {
    console.log('Get Cart');

    const userData = await User.findOne({ _id : req.user.id });
    res.json(userData.cartData);
}


export {
    addProduct,
    deleteProduct, 
    getAllProducts,
    getNewCollections,
    getPopularInWomen,
    addProductToCart,
    removeProductFromCart,
    getCart
};