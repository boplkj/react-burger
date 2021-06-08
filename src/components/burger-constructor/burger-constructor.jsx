import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import {CurrencyIcon, DragIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../modal/order-details/order-details'
 
export default function BurgerConstructor({data}) {
  const bun = data.filter(item=> item.type==='bun')
  const otherIngredients = data.filter(item=> item.type!=='bun')
  const sum = data.reduce((acc,val)=> acc + val.price,0)
  const [isOpen, setIsOpen] = useState(false)

  return(
    <>
     { isOpen &&
          <Modal handleClose = {() =>{setIsOpen(false)}}>
            <OrderDetails orderId="3123123"/>
        </Modal>
      }
    <div className={styles.root}>
      <section className={styles.topBun}>
      <ConstructorElement
      type="top"
      isLocked={true}
      text={bun[0].name}
      price={bun[0].price}
      thumbnail={bun[0].image}
    /> 
    </section>
    <section className={styles.scroll}>
      {otherIngredients.map(item=>
      <section key={item._id} className={styles.ingredientMargin}>
        <DragIcon/>
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        /> 
      </section>
      )}
      </section>
      <section className={styles.bottomBun}>
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={bun[0].name}
      price={bun[0].price}
      thumbnail={bun[0].image}
    /> 
    </section>
        <section className={styles.sum}> 
          <span className = {styles.sumText}>{sum}</span>
          <CurrencyIcon/>
          <section className={styles.button}>
          <Button type="primary" size="large" onClick={()=> setIsOpen(true)} >
            Оформить заказ
          </Button>
          </section>
          </section>
       </div>
       </>
        )
      }
      
      BurgerConstructor.propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
          type: PropTypes.string,
          price: PropTypes.number,
          image: PropTypes.string
          })
        ).isRequired
      }; 
