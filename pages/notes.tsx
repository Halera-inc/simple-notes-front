import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note";
import MyNotes from "src/components/MyNotes";


const Notes = () => {
    const colorStyle={
        backgroundColor: '#E5F1FD',
        color:'#5590C1',
        borderColor:'#5590C1',
    }
    return (
        <MainContainer>
            <div>
                <MyNotes title='My Notes'/>
                <Note textNode={'Hello, you are my frends'} titleNode={'your note'} style={colorStyle}/>

            </div>
        </MainContainer>
    )
}

export default Notes
