import Note from "../../../serverUtils/models/Note";
import dbConnect from "../../../serverUtils/dbConnect";

export default async function handler(req, res) {
    const {method} = req
    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const notes = await Note.find()
                res.status(200).json({notes})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            const {title, note_text, color, note_mode} = req.body
            try {
                // const user_id = req.user.id
                const newNote = await Note.create({
                    title,
                    note_text,
                    color,
                    note_mode,
                    // user: user_id
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