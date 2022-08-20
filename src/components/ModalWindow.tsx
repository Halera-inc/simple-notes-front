import React, {ChangeEvent, useState} from 'react';

type ModalWindowType = 'edit' | 'create'
type ModalWindowPropsType = {
    titleNode: string
    textNode: string
    modalType: ModalWindowType
}

const ModalWindow: React.FC<ModalWindowPropsType> = ({modalType, titleNode, textNode}) => {

    const [createTitle, setCreateTitle] = useState('')
    const [createContent, setCreateContent] = useState('')
    const [editTitle, setEditTitle] = useState(titleNode)
    const [editContent, setEditContent] = useState(textNode)

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        modalType === 'edit' ? setEditTitle(e.currentTarget.value) : setCreateTitle(e.currentTarget.value)
    }
    const onContentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        modalType === 'edit' ? setEditContent(e.currentTarget.value) : setCreateContent(e.currentTarget.value)
    }
    const onConfirmClickHandler = () => {
        modalType === 'edit' ? alert('Save in Edit mode') : alert('Save in Add mode') //need to fix
    }
    const onDiscardClickHandler = () => {
        modalType === 'edit' ? alert('Cancel in Edit mode') : alert('Cancel in Add mode') //need to fix
    }

    {
        if (modalType === 'edit') {
            return (
                <>
                    <input type="checkbox" id="my-modal" className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Edit your note!</h3>
                            <input type="text" className="my-2.5 rounded min-w-full px-1" value={editTitle}
                                   onChange={onTitleChangeHandler}/>
                            <textarea className="my-2.5 rounded min-w-full px-1" rows={10} value={editContent}
                                      onChange={onContentChangeHandler}></textarea>
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn" onClick={onConfirmClickHandler}>Save</label>
                                <label htmlFor="my-modal" className="btn" onClick={onDiscardClickHandler}>Cancel</label>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <input type="checkbox" id="my-modal" className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Create new note!</h3>
                            <input type="text" className="my-2.5 rounded min-w-full px-1" placeholder={'Add new title here...'}
                                   value={createTitle} onChange={onTitleChangeHandler}/>
                            <textarea className="my-2.5 rounded min-w-full px-1" rows={10} value={createContent}
                                      placeholder={'Add note content here...'}
                                      onChange={onContentChangeHandler}></textarea>
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn" onClick={onConfirmClickHandler}>Save</label>
                                <label htmlFor="my-modal" className="btn" onClick={onDiscardClickHandler}>Cancel</label>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
};

export default ModalWindow;