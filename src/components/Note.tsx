import s from './../styles/Note.module.css'
import EditIcon from "../assets/images/EditIcon";
import DeleteIcon from "../assets/images/DeleteIcon";

const Note = (props: { titleNode: string, textNode: string, style: any }) => {
    return (
        <div className={s.card} style={props.style}>
            <h2 className={s.cardTitle}>{props.titleNode}</h2>
            <p>{props.textNode}</p>
            <div className={s.cardAction}>
                <EditIcon/>
                <DeleteIcon/>
            </div>
        </div>
    );
};

export default Note;