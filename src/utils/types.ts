import {SettingsType} from "../api/notes-api";

// STORE types ==================================
export type UserType = {   //tmp type for develop //todo must be replace with original UserType when server API works
    id?: number,
    name?: string | null | undefined,
    email?: string | null | undefined,
    image?: string | null | undefined,
    country?: string,
    createdAt?: string,
    userpassword?: string,
    settings?: SettingsType,
    accessToken?: boolean
}

// export type SessionType = {
//     expires: string
//     user: UserType
// }

// API types ==================================
