import {SettingsType} from "../api/notes-api";

// STORE types ==================================
export type UserType = {   //tmp type for develop //todo must be replace with original UserType when server API works
    id: number,
    username: string,
    email: string,
    country: string,
    createdAt: string,
    userpassword: string,
    settings: SettingsType,
}



// API types ==================================
