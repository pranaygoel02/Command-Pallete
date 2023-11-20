'use client';
import { useEffect } from "react";
import styles from "./Modal.module.css";

function Modal({ children, show, onCloseModal }) {
  
  function closeModal(e) {
    console.log(e.target);
    e.stopPropagation();
    if(e.target.id === 'modal-backdrop') {
      onCloseModal();
    }
  }

  if(!show) return null;

  return (
    <section id="modal-backdrop" onClick={closeModal} className={styles.modalBackdrop}>
      <div className={`${styles.modalContainer}`}>
        {children}
      </div>
    </section>
  );
}

export default Modal;
