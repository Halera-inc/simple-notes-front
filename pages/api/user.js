import dbConnect from "../../serverUtils/dbConnect";
import {getSession} from "next-auth/react";
import User from "../../serverUtils/models/User";

export default async function handler(req, res) {
    const {method} = req
    await dbConnect()
    const session = await getSession({ req });
    const {user} = session

    switch (method) {
        case 'PUT':
            try {
                const {id, username, country, image} = req.body
                await User.findByIdAndUpdate(id, {
                    $set: {
                        username,
                        country,
                        image,
                    }
                }, {runValidators: true})
                const updatedUser = await User.findById(id)
                console.log('???UPDATE???')
                console.log(updatedUser)
                // if (candidate) {
                //     return res.status(400).json({message: 'An account is already registered with your email address'})
                // }
                // const updatedUser = await User.updateOne({_id: userId}, {
                //     $set: {
                //         username,
                //         image,
                //         country
                //     },
                // }, {runValidators: true})
                return res.status(200).json(updatedUser)

            } catch (e) {
                res.status(400)
                console.error(e);
                res.send("Error " + e);
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}

// class User {
//
//     async updateUser(req, res) {
//
//     }
//
// }

// async updateUserPassword(req, res) {
//     try {
//         const client = await pool.connect();
//         const userId = req.params.id
//         const oldPassword = req.query.oldPassword
//         const newPassword = req.query.newPassword
//         const oldPasswordRequest = await client.query(
//             `SELECT userpassword FROM users WHERE id = '${userId}'`
//         )
//         console.log(oldPasswordRequest.rows[0].userpassword)
//         if (oldPasswordRequest.rows[0].userpassword === oldPassword) {
//             const result = await client.query(
//                 `
//             UPDATE users
//             SET userpassword = '${newPassword}'
//             WHERE id = ${userId};
//             `);
//
//             const results = {'results': (result) ? result.rows : null};
//             res.send(results)
//             client.release();
//         } else {
//             res.send({
//                 message: 'Incorrect old password!'
//             })
//         }
//     } catch (err) {
//         res.status(400)
//         console.error(err);
//         res.send("Error " + err);
//     }
// }
