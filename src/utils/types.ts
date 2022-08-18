// example types

// U S E R

export type UserType = {
    id: string,
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

export type NoteTodoType = {
    id: string,
    mode: NoteViewType
    title: string | null,
    todos: Array<TaskType | null>
    dateOfCreate: Date,
    noteColor: ColorType
}
export type NoteTextType = {
    id: string,
    mode: NoteViewType
    title: string | null,
    text: string | null,
    dateOfCreate: Date,
    noteColor: ColorType
}
export type TaskType = {
    idTask: string,
    taskTitle: string,
    isDone: boolean
}
export type NoteViewType = 'TODO' | 'TEXT'
export type ColorType = {
    default: string
    blue: string
    green: string
    violet: string
    mustard: string
    dark: string
}