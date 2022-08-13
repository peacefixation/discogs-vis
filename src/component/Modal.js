import "../style/Modal.css";

import React, { useEffect } from 'react';

const Modal = ({ handleClose, children }) => {

    function escHandler(event) {
        if(event.key === "Escape") {
            handleClose();
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", escHandler, false);
        
        return function cleanup() {
            document.removeEventListener("keydown", escHandler, false);
        };
    });

    return (
        <div className="modal">
            <section className="modal-main">
                <button type="button" className="modal-close" onClick={handleClose}>
                    Close
                </button>
                {children}
            </section>
        </div>
    );
};

export default Modal;