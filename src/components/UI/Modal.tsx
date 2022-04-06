import { FunctionComponent, Fragment } from "react";
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

type BackdropProps = {
    onClose: () => void;
};

const Backdrop = ({ onClose }: BackdropProps) => {
    return <div className={classes.backdrop} onClick={onClose}></div>;
};

const ModalOverlay: FunctionComponent = ({ children }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.contet}>{children}</div>
        </div>
    )
};

const portalElement = document.getElementById('overlays');

type ModalProps = {
    onClose: () => void;
};

const Modal: FunctionComponent<ModalProps> = ({ children, onClose }) => {
    return (
        <Fragment>
            {portalElement && ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
            {portalElement && ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
        </Fragment>

    );

}

export default Modal;