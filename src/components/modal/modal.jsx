import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.css'
import ModalOverlay from './modal-overlay/modal-overlay'
import PropTypes from 'prop-types'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function Modal({title, isOpen, children}){

  useEffect(() => {
    const close = (e) => {
      if(e.key === 'Escape'){
        isOpen()
      }
    }
    document.addEventListener('keydown', close)
  return () => document.removeEventListener('keydown', close)
},[isOpen])

  return ReactDOM.createPortal (
    <ModalOverlay isOpen={isOpen}>
    <div className={styles.root } onClick={e => e.stopPropagation()}>
      <section className={styles.modal} >
      <section className={styles.header}>
        <section>
          {title && 
          <span className = {styles.modalText} >Детали ингредиента </span>
          }
        </section>
        <section onClick={isOpen} >
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
  title: PropTypes.bool,
  isOpen: PropTypes.func
}; 

