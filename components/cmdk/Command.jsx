import styles from '@/app/page.module.css'

function Command({cmd, onClick, children, style}) {
  return (
    <button onClick={onClick} className={`${styles.box} ${styles.cmdk} ${style}`}>{cmd?.icon} {cmd?.key || cmd?.name}</button>
  )
}

export default Command