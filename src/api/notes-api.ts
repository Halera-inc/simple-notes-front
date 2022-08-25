import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://simple-notes-back.herokuapp.com/',
    withCredentials: false,
    headers: {
        'API-KEY': '#'
    }
})


export const notesAPI = {
    //for Notes
    getNotes() {
        return instance.get(`notes`);
    },
    createNote(title: string | null, notetext: string | null) {
        return instance.post<{ title: string | null, text: string | null }, AxiosResponse<ResponseType<{ item: NoteTextType }>>>('notes', {
            title,
            notetext
        });
    },
    deleteNote(id: string) {
        return instance.delete<ResponseType>(`notes/${id}`);
    },
    updateNote(id: string, title: string, color: ColorType) {
        return instance.put(`notes/${id}`, {title,color});
    },

    //for Users
    getUsers() {
        return instance.get<UserType>(`users`);
    },
    deleteUsers(id: string) {
        return instance.delete<ResponseType>(`users/${id}`);
    },
    createUsers(username: string, email: string, country: string, password: string) {
        return instance.post<{ username: string, email: string, country: string, password: string }, AxiosResponse<ResponseType<{ item: UserType }>>>
        ('users', {username,email,country,password});
    },
    updateUsers(username: string, email: string, country: string) {
        return instance.put<AxiosResponse<ResponseType<{ item: UserType }>>>(`users`,{username,email,country});
    }
}

// Types

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

// U S E R

export type UserType = {
    id: number,
    name: string,
    email: string,
    password: string,
    dateToRegistration: Date,
    avatar: string,
    settings: SettingsType,
}
export type SettingsType = {
    darkMode: boolean,
    lineMode: boolean,
}

// N O T E S

// export type NoteTodoType = {
//     id: number,
//     notemode: NoteViewType
//     title: string | null,
//     // todos: Array<TaskType | null>
//     dateOfCreate: Date,
//     color: string
// }
export type NoteTextType = {
    id: number,
    notemode: NoteViewType
    title: string | null,
    notetext: string | null,
    dateOfCreate: Date,
    color: string
}
// export type TaskType = {
//     idTask: string,
//     taskTitle: string,
//     isDone: boolean
// }
export type NoteViewType = 'NoteText' | 'NoteTodo'

export type ColorType = {
    default: string
    blue: string
    green: string
    violet: string
    mustard: string
    dark: string
}

