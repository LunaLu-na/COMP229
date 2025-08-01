import User from '../models/user.model.js'
import config from './../../config/config.js'
const signin = async (req, res) => { 
    try {
        let user = await User.findOne({ "email": req.body.email }) 
        if (!user)
        return res.status('401').json({ error: "User not found" }) 
        if (!user.authenticate(req.body.password)) {
        return res.status('401').send({ error: "Email and password don't match." })
        }
        const token = jwt.sign({ _id: user._id }, config.jwtSecret) 
        res.cookie('t', token, { expire: new Date() + 9999 }) 
        return res.json({
        token, 
        user: {
        _id: user._id, 
        name: user.name,
        email: user.email 
        }
        })
        } catch (err) {
        return res.status('401').json({ error: "Could not sign in" }) 
        }
        

}
const signout = (req, res) => { 


}
const requireSignin = ''
const hasAuthorization = (req, res) => { 

    
 }
export default { signin, signout, requireSignin, hasAuthorization }

