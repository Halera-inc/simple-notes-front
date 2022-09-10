import bcrypt from 'bcrypt'
import User from "../../serverUtils/models/User";

class Auth {
    // \
    // async login(req, res) {
    //     try {
    //         const {email, password} = req.body
    //         const user = await User.findOne({email})
    //         if (!user) {
    //             return res.status(400).json({message: `Email or Password incorrect`})
    //         }
    //         const validPassword = bcrypt.compareSync(password, user.password)
    //         if (!validPassword) {
    //             return res.status(400).json({message: `Email or Password incorrect`})
    //         }
    //         const token = generateAccessToken(user._id)
    //         return res.json({token, user})
    //     } catch (e) {
    //         res.status(400)
    //         console.error(e);
    //         res.send("Error " + e);
    //     }
    // }

//     async logout(req, res) {
//         try {
//
//         } catch (e) {
//             res.status(400)
//             console.error(e);
//             res.send("Error " + e);
//         }
//     }
//
//     async me(req, res) {
//         try {
//             const user = await User.findById(req.user.id)
//             res.json(user)
//         } catch (e) {
//             res.status(400)
//             console.error(e);
//             res.send("Error " + e);
//         }
//     }
}

export default new Auth