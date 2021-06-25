import React, {useState} from 'react'
import styles from './styles.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { addIngredient } from '../../services/slices/constructorListSlice'
import { useDrop } from 'react-dnd'
import {CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../modal/order-details/order-details'
import BurgerConstructorDragged from './burger-constructor-dragged/burger-constructor-dragged'
import { postOrder } from '../../services/slices/orderSlice'
 
export default function BurgerConstructor() {
  const dispatch = useDispatch()
  const bun = useSelector(store => store.constructorList.bun)
  const otherIngredients = useSelector(store => store.constructorList.items)
  const sum = useSelector(store => store.constructorList.sum)
  const order = useSelector(store => store.order)
  const [, drop] = useDrop({
    accept: 'item',
    drop: (item) => {dispatch(addIngredient(item)) 
      },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
})


  const [isOpen, setIsOpen] = useState(false)

  const onClick= () => {
    const idArr =  otherIngredients.map(item => item.id)
    const newArr = []
    newArr.push(idArr,bun._id,bun._id)
    dispatch(postOrder(newArr))
    setIsOpen(true)
  }

  return(
    <>
     { isOpen &&
          <Modal handleClose = {() =>{setIsOpen(false)}}>
            {order.request? <span>Мы обрабатываем ваш заказ </span> :
            order.errorCode? <span>К сожалению произошла Ошибка, {order.errorCode}</span> : 
              <OrderDetails orderId={order.success}/>
            }
        </Modal>
      }
    <div ref={drop} className={styles.root}>
      <section className={styles.topBun}>
        <ConstructorElement
        type="top"
        isLocked={true}
        text={bun.name}
        price={bun.price}
        thumbnail={bun.image}
      /> 
    </section>
    {otherIngredients.length? 
      <section className={otherIngredients.length>3 && styles.scroll}>
        {otherIngredients.map((item, index)=>
          <section key={item._id}>
            <BurgerConstructorDragged item={item} index={index} />
          </section>
        )}
      </section> : null}
      <section className={styles.bottomBun}>
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={bun.name}
      price={bun.price}
      thumbnail={bun.image}
    /> 
    </section>
        <section className={styles.sum}> 
          <span className = {styles.sumText}>{sum}</span>
          <CurrencyIcon/>
          <section className={styles.button}>
          <Button type="primary" size="large" onClick={onClick} >
            Оформить заказ
          </Button>
          </section>
          </section>
       </div>
       </>
        )
      }