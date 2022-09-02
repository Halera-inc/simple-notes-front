import axios, {AxiosResponse} from 'axios'
import config from "tailwindcss/defaultConfig";

enum BASE_URLS {
    LOCAL = 'http://localhost:5050',
    HEROKU = 'https://simple-notes-back.herokuapp.com/'
}

const instance = axios.create({
    baseURL: BASE_URLS.HEROKU,
    withCredentials: false,
})
if (typeof window !== 'undefined') {
    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
}
export const notesAPI = {
    //for Notes
    getNotes() {
        return instance.get(`notes`);
    },
    getNote(id: string) {
        return instance.get(`notes/${id}`);
    },
    createNote(title?: string, note_text?: string, color?: string, note_mode?: string) {
        return instance.post('notes', {
            title,
            note_text,
            color,
            note_mode,
        });
    },
    deleteNote(id: string) {
        return instance.delete(`notes/${id}`);
    },
    updateNote(id: string, title?: string, note_text?: string, color?: string, note_mode?: string) {
        return instance.put(`notes/${id}`, {
            title,
            note_text,
            color,
            note_mode,
        });
    }
}
//for Auth
export const authAPI = {
    me() {
        return instance.get('auth/me')
    },
    register(email: string, password: string, country?: string, username?: string) {
        return instance.post(`auth/registration`, {email, password, country, username})
    },
    login(email: string, password: string) {
        return instance.post(`auth/login`, {email, password})
    },

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
}
export type SettingsType = {
    darkMode?: boolean,
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
    _id: number,
    note_mode?: NoteViewType
    title?: string,
    note_text?: string,
    createdAt?: Date,
    color?: string,
    user?: string
}
export type TaskType = {
    idTask: string,
    taskTitle: string,
    isDone: boolean
}
export type NoteViewType = 'note_text' | 'note_todo'

// export type ColorType = {
//     default: string
//     blue: string
//     green: string
//     violet: string
//     mustard: string
//     dark: string
// }