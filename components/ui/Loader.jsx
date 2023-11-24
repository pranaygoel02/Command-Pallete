import { CgSpinner } from 'react-icons/cg'
import styles from './ui.module.css'

function Loader({loading}) {
  console.log('LOADING ', loading)
  return (
    <CgSpinner className={loading ? styles.animateSpin : ""} />
  )
}

export default Loader