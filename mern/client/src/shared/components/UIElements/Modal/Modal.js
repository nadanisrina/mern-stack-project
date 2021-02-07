import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../Backdrop/Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault}>
        <div className={`modal__content ${props.headerClass}`}>{props.children}</div>
        <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && <Backdrop setDrawerIsOpen={props.onCancel} />}
      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};
export default Modal;
