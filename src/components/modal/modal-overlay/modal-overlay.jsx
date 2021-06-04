import React  from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

export default function ModalOverlay({isOpen, children}){

  return(
    <div className={styles.root} onClick = {isOpen}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  isOpen: PropTypes.func
}; 

