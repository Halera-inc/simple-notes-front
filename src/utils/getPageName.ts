
export enum APP_ROOTS {
    HOME_PAGE = '/',
    LOGIN_PAGE = '/signIn',
    REGISTRATION_PAGE = '/registration',
    ABOUT_PAGE = '/about',
    NOT_FOUND_PAGE = '/404',
    MY_NOTES_PAGE = '/notes',
    SETTINGS_PAGE = 'settings',
}


export const getPageName = (pathName: APP_ROOTS) => {
    switch (pathName) {
        case APP_ROOTS.LOGIN_PAGE: {
            return 'Login'
        }
        case APP_ROOTS.MY_NOTES_PAGE: {
            return 'My notes'
        }
        case APP_ROOTS.REGISTRATION_PAGE: {
            return 'Registration'
        }
        case APP_ROOTS.HOME_PAGE: {
            return 'Home page'
        }
        case APP_ROOTS.SETTINGS_PAGE: {
            return 'Settings'
        }
        case APP_ROOTS.ABOUT_PAGE: {
            return 'About'
        }
        case APP_ROOTS.NOT_FOUND_PAGE: {
            return '404'
        }
        default: {
            return 'HomePage'
        }
    }
}