export const cropText = (text: string) => {
    if (text.length > 300) {
        return text.split('').slice(0, 300).join('') + '...'
    }
    else return text
}