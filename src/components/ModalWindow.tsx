import React, {ChangeEvent, useState} from 'react';

type ModalWindowType = 'edit' | 'create'
type ModalWindowPropsType = {
    titleNode: string
    textNode: string
    typeNode: ModalWindowType
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onConfirm: () => void
    onDiscard: () => void
}

const ModalWindow: React.FC<ModalWindowPropsType> = ({typeNode, titleNode, textNode, onTitleChange,
                                                         onTextChange, onConfirm, onDiscard}) => {

    {
        if (typeNode === 'edit') {
            return (
                <>
                    <input type="checkbox" id='my-modal' className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Edit your note!</h3>
                            <input type="text" className="my-2.5 rounded min-w-full px-1" value={titleNode}
                                   onChange={onTitleChange}/>
                            <textarea className="my-2.5 rounded min-w-full px-1" rows={10} value={textNode}
                                      onChange={onTextChange}></textarea>
                            <div className="modal-action">
                                <label htmlFor='my-modal' className="btn"
                                       onClick={onConfirm}>Save</label>
                                <label htmlFor='my-modal' className="btn"
                                       onClick={onDiscard}>Cancel</label>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <input type="checkbox" id='my-modal-add-note' className="modal-toggle"/>
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Create new note!</h3>
                            <input type="text" className="my-2.5 rounded min-w-full px-1"
                                   placeholder={'Add new title here...'}
                                   value={titleNode} onChange={onTitleChange}/>
                            <textarea className="my-2.5 rounded min-w-full px-1" rows={10} value={textNode}
                                      placeholder={'Add note content here...'}
                                      onChange={onTextChange}></textarea>
                            <div className="modal-action">
                                <label htmlFor='my-modal-add-note' className="btn"
                                       onClick={onConfirm}>Save</label>
                                <label htmlFor='my-modal-add-note' className="btn"
                                       onClick={onDiscard}>Cancel</label>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
};

export default ModalWindow;