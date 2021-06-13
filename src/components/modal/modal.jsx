import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'
import PropTypes from 'prop-types'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function Modal({title, handleClose, children}){

  useEffect(() => {
    const close = (e) => {
      if(e.key === 'Escape'){
        handleClose()
      }
    }
    document.addEventListener('keydown', close)
  return () => document.removeEventListener('keydown', close)
},[handleClose])

  return ReactDOM.createPortal (
    <ModalOverlay handleClose={handleClose}>
    <div className={styles.root } onClick={e => e.stopPropagation()}>
      <section className={styles.modal} >
      <section className={styles.header}>
        <section>
          {title && (
          <span className = {styles.modalText} >{title}</span>
          )
          }
        </section>
        <section onClick={handleClose} >
          <CloseIcon/> 
        </section>
      </section>
        {children}
      </section>
    </div>
    </ModalOverlay>,
      document.querySelector('#root-modal')
  )
}
Modal.propTypes = {
  title: PropTypes.string,
  handleClose: PropTypes.func
}; 

