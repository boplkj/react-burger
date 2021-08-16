import React, {useState} from 'react'
import styles from './styles.module.css'
import { addIngredient } from '../../services/slices/constructorListSlice'
import { useDrop } from 'react-dnd'
import { useHistory, useLocation } from 'react-router-dom'
import {CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import OrderDetails from '../modal/order-details/order-details'
import BurgerConstructorDragged from './burger-constructor-dragged/burger-constructor-dragged'
import { postOrder } from '../../services/slices/orderSlice'
import { useAppDispatch } from '../../services/store'
import {useAppSelector} from '../../services/store'
 
const BurgerConstructor: React.FC= () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const location = useLocation()
  const bun = useAppSelector((store) => store.constructorList.bun)
  const otherIngredients = useAppSelector((store) => store.constructorList.items)
  const sum = useAppSelector((store) => store.constructorList.sum)
  const order = useAppSelector((store) => store.order)
  const store  = useAppSelector((store) => store.auth);
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
    if (store.email){
    const idArr =  otherIngredients.map(item => item.id)
    const newArr = []
    newArr.push(idArr,bun._id,bun._id)
    dispatch(postOrder(newArr))
    setIsOpen(true)
    } else{
      if (!store.email) {
        history.replace({pathname: '/login', state: {target: location}});
        return;
    }

    }
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
    <div ref={drop} className={styles.root} id='drop'>
      <section className={styles.topBun}>
        <ConstructorElement
        type="top"
        isLocked={true}
        text={bun.name + ' (верх)'}
        price={bun.price}
        thumbnail={bun.image}
      /> 
    </section>
    {otherIngredients.length? 
      <section className={otherIngredients.length>3? styles.scroll :''}>
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
      text={bun.name + ' (низ)'}
      price={bun.price}
      thumbnail={bun.image}
    /> 
    </section>
        <section className={styles.sum}> 
          <span className = {styles.sumText}>{sum}</span>
          <CurrencyIcon type='secondary'/>
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

export default BurgerConstructor