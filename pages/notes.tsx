import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note";


const Notes = () => {
    const colorStyle={
        backgroundColor: '#E5F1FD',
        color:'#5590C1',
        borderColor:'#5590C1',
    }
    return (
        <MainContainer>
            <div>
                <h1>My notes</h1>
                <Note textNode={'Hello, you are my frends'} titleNode={'your note'} style={colorStyle}/>

            </div>
        </MainContainer>
    )
}

export default Notes