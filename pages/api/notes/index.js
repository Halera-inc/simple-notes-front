import Note from "../../../serverUtils/models/Note";
import dbConnect from "../../../serverUtils/dbConnect";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {getToken} from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req, res) {
    const {method} = req
    const token = await getToken({ req, secret})
    console.log(token)
    await dbConnect()
    const session = await unstable_getServerSession(req, res, authOptions);
        // console.log(session)

    if (!session) {
    res.status(401).json({ message: "You must be logged in to make this request." });
    return;
  }
    const {user} = session

    switch (method) {
        case 'GET':
            try {
                const notes = await Note.find({user: user.id})
                res.status(200).json({notes})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            const {title, note_text, color, note_mode} = req.body
            try {
                const newNote = await Note.create({
                    title,
                    note_text,
                    color,
                    note_mode,
                    user: user.id,
                    createdAt: Date().toString()
                })
                res.status(201).json({newNote})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}