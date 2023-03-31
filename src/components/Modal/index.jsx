import React from 'react'
import { createPortal } from 'react-dom'

export const Modal = ({maskeCloseable, visbile, onCancel, children})=> {

    const onMaskeClick = () =>{
        if(maskeCloseable) onCancel?.()
    }

    if(!visbile) return null

    return createPortal(
            <div className="popup-video" onClick={onMaskeClick}>
                <div className="wrap">
                    {children}
                </div>
                <div className="close" onClick={onCancel}/>
            </div>,
            document.body
    )
}
