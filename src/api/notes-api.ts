import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL: '#',
    withCredentials: true,
    headers: {
        'API-KEY': '#'
    }
})


export const notesAPI = {
    //for Notes
    getNote() {
        return instance.get<Array<NoteTextType>>('#');
    },
    createNote(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: NoteTextType }>>>('#', {title});
    },
    deleteNote(id: string) {
        return instance.delete<ResponseType>(`#/${id}`);
    },
    updateNote(id: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`#/${id}`, {title});
    },

    //for Tasks
    getTasks(todoId: string) {
        return instance.get<NoteTodoType>(`#/${todoId}/#`);
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseType>(`#/${todoId}/#/${taskId}`);
    },
    createTask(todoId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`#/${todoId}/#`, {title});
    },
    updateTask(todoId: string, taskId: string) {
        return instance.put<AxiosResponse<ResponseType<{ item: TaskType }>>>(`#/${todoId}/#/${taskId}`);
    }
}

// Types

//Notes Type
export interface NoteTodoType {
    id: string
    mode: NoteViewType
    title: string | null
    dateOfCreate: Date
    todos: Array<TaskType | null>
}

export type NoteTextType = {
    id: string
    mode: NoteViewType
    title: string | null
    text: string | null
    dateOfCreate: Date
}

export type TaskType = {
    idTask: string
    taskTitle: string
    isDone: boolean
}

//Tasks Type

//
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type NoteViewType = 'TODO' | 'TEXT'