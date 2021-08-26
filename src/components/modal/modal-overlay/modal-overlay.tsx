import React  from 'react'
import styles from './styles.module.css'

interface IProps {
  handleClose: ()=>void
}
const ModalOverlay: React.FC<IProps>=({handleClose, children})=>{

  return(
    <div className={styles.root} onClick = {handleClose}>
      {children}
    </div>
  )
}
export default ModalOverlay

