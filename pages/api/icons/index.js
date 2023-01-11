import Icon from "../../../serverUtils/models/Icon";
import dbConnect from "../../../serverUtils/dbConnect";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const {method} = req
    await dbConnect()
    const session = await getSession({req});
    const {user} = session

    switch (method) {
        case 'GET':
            try {
                const icon = await Icon.find({user: user.id})
                res.status(200).json({icon})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            let {icon} = req.body
            try {
                const currentIcon = await Icon.find({user: user.id})
                if (currentIcon.length === 0){
                    console.log('????Create????')
                    const newIcon = await Icon.create({
                        icon,
                        user: user.id,
                    })
                    res.status(201).json({newIcon})
                } else {
                    console.log('????Update????')
                    const updatedIcon = await Icon.findOneAndUpdate({user: user.id}, {icon}, {new: true})
                    res.status(201).json({updatedIcon})
                }
            }
            catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}

//.map((n, index) => {return notes[index]}).save()
