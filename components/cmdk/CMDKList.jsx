'use client'
import { memo } from "react";
import styles from "./CMDK.module.css";
import CMDKItem from "./CMDKItem";
import { useRouter } from "next/navigation";

function CMDKList({data, closeCommandPalette}) {
  
  const router = useRouter();
  
  function handleClick(e) {
    e.stopPropagation();
    const target = e.target;
    const url = target.dataset.url;
    const obj = data.find(item => item.title === target.title);
    console.log(obj, url);
    if(url) {
      router.push(url);
    }
  }

  return (
    <div onClick={handleClick} className={styles.list}>
      {data.length === 0 ? <p>No matches found</p> : data?.map((item, index) => (
            <CMDKItem key={index} {...item} index={index + 1} toggleMenu={closeCommandPalette}/>
          ))}
    </div>
  )
}

export default memo(CMDKList)