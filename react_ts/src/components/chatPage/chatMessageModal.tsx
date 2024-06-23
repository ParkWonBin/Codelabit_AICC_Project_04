import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './chatMessageModal.css';

interface ModalProps {
    content: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div className="modal-overlay" onDoubleClick={onClose}>
            <div className="modal-content" onDoubleClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
};

export default Modal;
