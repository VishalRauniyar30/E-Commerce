import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from "../models/user.models.js"


export const signin = async(req, res) => {
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
}

export const signup = async (req, res) => {
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
}
