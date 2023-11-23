"use client";
import { useCMDK } from "context/cmdk.context.jsx";
import Modal from "../modal/Modal";
import styles from "./CMDK.module.css";
import { CgSpinner } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { AiOutlineEnter } from "react-icons/ai";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import CMDKList from "./CMDKList";
import Command from "./Command";
import TypesList from "./TypesList";

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

  const minLevel = filteredData.reduce((acc, item) => {
    if (item.level < acc) return item.level;
    return acc;
  }, filteredData[0]?.level);

  return (
    <Modal show={showCommandPalette} onCloseModal={closeCommandPalette}>
      <div className={styles.cmdkContainer}>
        <section className={styles.searchContainer}>
          {!searching ? (
            <FiSearch />
          ) : (
            <CgSpinner className={searching ? "animate-spin" : ""} />
          )}
          {actionStack && actionStack.length > 0 && (
            <span className={styles.actionStack}>{actionStack.join(" / ")} /</span>
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
            minLevel={minLevel}
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
  );
}

export default CMDK;
