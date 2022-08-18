import MainContainer from "../src/components/MainContainer";
import Note from "../src/components/Note";

const Notes = () => {
    return (
        <MainContainer>
            <div>
                <h1>My notes</h1>
                <Note textNode={'Hello, you are my frends  '} titleNode={'your note'}/>

            </div>
        </MainContainer>
    )
}

export default Notes