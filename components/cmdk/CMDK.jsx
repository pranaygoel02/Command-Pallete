"use client";
import { useCMDK } from "context/cmdk2.context.jsx";
import Modal from "../modal/Modal";
import styles from "./CMDK.module.css";
import { CgSpinner } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { AiOutlineEnter } from "react-icons/ai";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import CMDKList from "./CMDKList";
import Command from "./Command";
import TypesList from "./TypesList";
import { AnimatePresence } from "framer-motion";
import Loader from "../ui/Loader";

function CMDK() {
  const {
    showCommandPalette,
    searching,
    handleSearch,
    filteredData,
    closeCommandPalette,
    handleItemSelection,
    actionStack
  } = useCMDK();

  console.log(filteredData);

  return (
    <AnimatePresence>
    <Modal show={showCommandPalette} onCloseModal={closeCommandPalette}>
      <div className={styles.cmdkContainer}>
        <section className={styles.searchContainer}>
          {!searching ? (
            <FiSearch />
          ) : (
            <Loader loading={searching} />
          )}
          {actionStack && actionStack.length > 0 && (
            <>
            <span className={styles.actionStack}>{actionStack[actionStack.length - 1]}</span>
            <span>/</span>
            </>
          )}
          <input
            id="cmdk-search"
            onChange={handleSearch}
            autoFocus={true}
            placeholder="Search..."
            autoComplete="off"
            className={styles.cmdkInput}
          />
          <Command onClick={closeCommandPalette} cmd={{name: "ESC"}} />
        </section>
        <TypesList />
        <section
          onMouseMove={handleItemSelection}
          style={{ height: `${Math.max(filteredData.length * 52 + 84, 105)}px` }}
          >
          <CMDKList
            data={filteredData}
            closeCommandPalette={closeCommandPalette}
          />
        </section>
        <section className={styles.navigationControl}>
          <div className="inline-flex">
            <Command onClick={closeCommandPalette} cmd={{icon: <FaArrowUp />}} />
            <Command onClick={closeCommandPalette} cmd={{icon: <FaArrowDown />}} />
            to navigate
          </div>
          <div className="inline-flex">
            <Command onClick={closeCommandPalette} cmd={{icon: <AiOutlineEnter />}} />
            to select
          </div>
        </section>
      </div>
    </Modal>
    </AnimatePresence>
  );
}

export default CMDK;
