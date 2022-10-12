import Note from "../../../serverUtils/models/Note";
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
                const notes = await Note.find({user: user.id})
                console.log(notes)
                res.status(200).json({notes})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            let {title, note_text, color, note_mode} = req.body
            if(!title) {
                title = 'Add you title'
            }
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
        case 'PUT':
            const {notes} = req.body
            console.log('notes', notes)
            try {

                console.log('Try')

                // const updatedNotes = await Note.find({user: user.id})

                await Note.deleteMany({user: user.id})
                const insertedNotes = await Note.insertMany(notes)

                console.log('Server updatedNotes ', insertedNotes)

                // for (let i = 0; i < updatedNotes.length; i++) {
                //     updatedNotes[i] = notes[i]
                // }
                // const uNotes = updatedNotes.map((n, index) => {
                //     n = notes[index]
                // })
                res.status(201).json({insertedNotes})
            } catch (error) {
                console.log('Catch', error)

                res.status(400).json({success: false})
            }
            break
    }
}

//.map((n, index) => {return notes[index]}).save()
