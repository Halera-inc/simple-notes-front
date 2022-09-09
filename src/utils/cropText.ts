export const cropText = (text: string) => {
    if (text.length > 400) {
        return text.split('').slice(0, 430).join('') + '...'
    }
    else return text
}