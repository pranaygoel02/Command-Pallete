import styles from '@/app/page.module.css'

function Command({cmd, onClick}) {
  return (
    <button onClick={onClick} className={`${styles.box} ${styles.cmdk}`}>{cmd}</button>
  )
}

export default Command