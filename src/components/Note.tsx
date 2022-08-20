import s from './../styles/Note.module.css'
import EditIcon from "../assets/images/EditIcon";
import DeleteIcon from "../assets/images/DeleteIcon";


type NotePropsType = {
    title: string | null
    text: string | null
    color: string
}

const Note = ({title, text, color}: NotePropsType) => {

    if (color === 'blue') color = "#5590C1"
    if (color === 'green') color = "#5E9C80"
    if (color === 'violet') color = "#866FA7"
    if (color === 'mustard') color = "#C6B05D"
    if (color === 'dark') color = "#444343"
    if (color === 'default') color = "#4e5458"

    return (
        <div className={s.card} style={{color}}>
            <h2 className={s.cardTitle}>{title}</h2>
            <p>{text}</p>
            <div className={s.cardAction}>
                <EditIcon/>
                <DeleteIcon/>
            </div>

        </div>
    );
};

export default Note;
