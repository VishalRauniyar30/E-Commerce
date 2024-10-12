import jwt from 'jsonwebtoken'

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

export default fetchUser