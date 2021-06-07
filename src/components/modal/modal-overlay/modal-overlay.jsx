import React  from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

export default function ModalOverlay({handleClose, children}){

  return(
    <div className={styles.root} onClick = {handleClose}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func
}; 

