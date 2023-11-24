import { memo, useEffect, useRef } from "react";
import styles from "./CMDK.module.css";
import { useCMDK } from "@/context/cmdk2.context";
import Command from "./Command";

function TypesList() {
    const containerRef = useRef(null);

    const { toggleTypeSelection, selectedTypes, types } = useCMDK();

    //console.log('TYPES', types);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (event) => {
      event.preventDefault();
      container?.scrollTo({
        left: container.scrollLeft + event.deltaY,
      });
    };

    container?.addEventListener("wheel", handleWheel);

    return () => {
      container?.removeEventListener("wheel", handleWheel);
    };
  }, []);


  if(types.length <= 1) return null;
    return (
    types.length > 1 && (
        <section ref={containerRef} className={styles.typesContainer}>
          {types.map((type, i) => (
            <Command onClick={() => toggleTypeSelection(type.name)} key={i} cmd={type} style={selectedTypes.includes(type.name) ? styles.itemSelected : null} />
          ))}
        </section>
      )
  )
}

export default TypesList