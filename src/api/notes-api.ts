import axios from 'axios'

// enum BASE_URLS {
//     LOCAL = 'http://localhost:3000',
//     HEROKU = 'https://simple-notes-back.herokuapp.com/',
//     VERCEL = 'https://simple-notes-app-pearl.vercel.app',
// }

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true
})

export const notesAPI = {
    //for Notes
    getNotes() {
        return instance.get(`api/notes`);
    },
    getNote(id: string) {
        return instance.get(`api/notes/${id}`);
    },
    createNote(title?: string, note_text?: string, color = 'blue', note_mode?: string) {
        return instance.post('api/notes', {
            title,
            note_text,
            color,
            note_mode,
        });
    },
    deleteNote(id: string) {
        return instance.delete(`api/notes/${id}`);
    },
    updateNote(id: string, title?: string, note_text?: string, color?: string, note_mode?: NoteViewType, pinned?:boolean) {
        return instance.put(`api/notes/${id}`, {
            title,
            note_text,
            color,
            note_mode,
            pinned,
        });
    },
    dndNotes(newNotesArr: NoteTextType[]){
        return instance.put('api/notes', {notes: newNotesArr})
    }
}
//for Auth
export const authAPI = {
    me() {
        return instance.get('api/auth/me')
    },
    register(email: string, password: string, country?: string, username?: string) {
        return instance.post(`api/register`, {email, password, country, username})
    },
    // login(email: string, password: string) {
    //     return instance.post(`auth/login`, {email, password})
    // },

}

//for User

export const userAPI = {
    getUser(){
        return instance.get(`user`)
    },
    updateUser(id: string, username?: string, country?: string, image?: string) {
        return instance.put(`api/user`, {id, username, country, image})
    },
    updateIcon(user: string, icon: string) {
        return instance.post(`api/icons`,{user, icon})
    },
    getIcon(){
        return instance.get(`api/icons`)
    }

}

// Types

export type ResponseType<D = {}> = {
    status: number
    messages: Array<string>
    data: D
}

// U S E R

export type UserType = {
    _id: string,
    username?: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt?: Date
    settings?: SettingsType,
    country?: string
    image: string
}
export type SettingsType = {
    darkmode?: boolean,
    themecolor?: string,
}

// N O T E S

export type NoteTodoType = {
    id: number,
    note_mode: NoteViewType
    title: string | null,
    todos: Array<TaskType | null>
    dateOfCreate: Date,
    color: string
}
export type NoteTextType = {
    _id: string,
    note_mode?: NoteViewType
    title?: string,
    note_text?: string,
    createdAt?: Date,
    color: ColorSamplesType,
    user?: string
    pinned: boolean
}
export type TaskType = {
    idTask: string,
    taskTitle: string,
    isDone: boolean
}
export type sessionDataType = {
    data: {
        expires: string
        user: {
            name?: string
            email?: string
            image?: string
            accessToken?: boolean
        }
    }
    status: string
}
export type NoteViewType = 'note_text' | 'note_todo'
export type ColorSamplesType =
    "blue"
    | "green"
    | "violet"
    | "mustard"
    | "dark"
    | "default"

