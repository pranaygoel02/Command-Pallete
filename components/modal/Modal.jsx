"use client";

import styles from "./Modal.module.css";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ children, show, onCloseModal }) {
  function closeModal(e) {
    e.stopPropagation();
    if (e.target.id === "modal-backdrop") {
      onCloseModal();
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <section
            id="modal-backdrop"
            onClick={closeModal}
            className={styles.modalBackdrop}
          >
            <div className={`${styles.modalContainer}`}>{children}</div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
