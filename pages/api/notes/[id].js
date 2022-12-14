import Note from "../../../serverUtils/models/Note";
import dbConnect from "../../../serverUtils/dbConnect";
import {getSession} from "next-auth/react";

export default async function handler(req, res) {
    const {
        query: {targetId},
        method,
    } = req
    const session = await getSession({ req });
    const {user} = session

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const selectedNote = await Note.findById(targetId);
                if (!selectedNote) {
                    return res.status(400).json('Note does not exist')
                }
                res.status(200).json({selectedNote})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'PUT':
            try {
                const {title, note_text, color, note_mode, pinned} = req.body
                const targetId = req.query.id
                await Note.findByIdAndUpdate(targetId, {
                    $set: {
                        title,
                        note_text,
                        color,
                        note_mode,
                        pinned
                    }
                }, {runValidators: true})
                const updatedNote = await Note.findById(targetId)
                res.status(200).json({updatedNote})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'DELETE':
            try {
                const targetId = req.query.id
                const verifyNote = await Note.findById(targetId)
                if (!verifyNote) return res.status(400).json({message: "There is no requested Note with this id"})
                await Note.findByIdAndDelete(targetId)
                res.status(200).json({message: "Note has been successfully deleted"})
            } catch (err) {
                res.status(400).json({success: false})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}