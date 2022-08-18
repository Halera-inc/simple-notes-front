import s from './../styles/Note.module.css'

const Note = (props:{titleNode:string,textNode:string}) => {
    return (
        <div className={s.card}>
                <h2 className={s.cardTitle}>{props.titleNode}</h2>
                <p>{props.textNode}</p>
                <div className={s.cardAction}>
                    <img className={s.editIcon}/>
                    <img className={s.delete}/>
                </div>
        </div>
    );
};

export default Note;