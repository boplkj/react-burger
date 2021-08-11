import React from 'react'
import check from '../../../images/check.gif'
//import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

interface IProp {
  orderId: any
}

const OrderDetails: React.FC<IProp>= ({orderId}) =>{

  return(
    <div className={styles.root}>
      <section className={styles.orderId} >
        <span className={styles.orderNumber}>{orderId}</span>
        <span className={styles.orderIdText}> идентификатор заказа </span>
        <section>
        <img src={check} className={styles.checkImage} alt='Your order is being cooked' />
        {/* <CheckMarkIcon/> */}
        </section>
        <span className = {styles.orderMessage}>Ваш заказ начали готовить</span>
        <span className={styles.waitMessage}>Дождитесь готовности на орбитальной станции</span>
 
      </section>
      </div>
        )
      }

export default OrderDetails