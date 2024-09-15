import React from 'react';

type ModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> & { setAppElement: (element: string) => void } = ({ isOpen, onRequestClose, children }) => (
    isOpen ? (
        <div data-testid="modal">
            <button onClick={onRequestClose}>Close Modal</button>
            {children}
        </div>
    ) : null
);

// Mocking setAppElement
Modal.setAppElement = () => {};

export default Modal;
