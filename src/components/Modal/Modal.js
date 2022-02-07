import  { useEffect } from 'react';
import { createPortal} from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';


const modalRoot=document.querySelector('#modal-root');
 function Modal({onClose, children}) {
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
              onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return (() => {
            window.removeEventListener('keydown', handleKeyDown);
        })


    }, [onClose]);
   
    const handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
          onClose();
        }
      };

    
        return createPortal(
            <div  onClick={handleOverlayClick} className={s.overlay}>
                <div className={s.modal}>{children}</div>
            </div>,
            modalRoot,
        )
    
   
}

Modal.propTypes = {
    children: PropTypes.element,
};

export default Modal;