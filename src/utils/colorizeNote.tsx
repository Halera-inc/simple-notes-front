
const colorizeNote = (color: string) => {
    if (color === 'blue') return  {color: "#5590C1", borderColor: "#5590C1", backgroundColor: "#E5F1FD"}
    if (color === 'green') return  {color: "#5E9C80", borderColor: "#5E9C80", backgroundColor: "#D6EDD9"}
    if (color === 'violet') return {color: "#866FA7", borderColor: "#866FA7", backgroundColor: "#E5DEF0"}
    if (color === 'mustard') return {color: "#C6B05D", borderColor: "#C6B05D", backgroundColor: "#F6F0D8"}
    if (color === 'dark') return {color: "#FFF",  borderColor: "#444343", backgroundColor: "#212121"}
    else return {color: "#000000", borderColor: "#000000", backgroundColor: "#E5E5E5"}
}

export default colorizeNote