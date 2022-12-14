import React from "react";

export default function Modal({ children, shown, close, align, topbar }) {
    return shown ? (
        <div
            className="modal-backdrop">
            <div
                className={align ? align + " viewOfficial" : "modal-content"}
                >
                {children}
            </div>
        </div>
    ) : null;
}


