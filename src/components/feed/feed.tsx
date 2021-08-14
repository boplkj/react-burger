import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { wsOpenConnection, wsClose } from '../../services/slices/orderFeedSlice'
import status from '../helpers/status'
import { useLocation} from "react-router-dom";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'
import {RootState, useAppDispatch}  from '../../services/store'

interface IProps{
  link: string
}
const Feed: React.FC<IProps>=({link}) => {
  const location = useLocation();
  console.log(location)
  const dispatch = useAppDispatch()
  const store = useSelector((store:RootState) => store.orderFeed)
  const allIngredients = useSelector((store:RootState) => store.ingredientsList)
  useEffect(() => {
    if (location.pathname === '/feed'){   
      console.log('here?')       
      dispatch(wsOpenConnection({url:'wss://norma.nomoreparties.space/orders/all', user:false}))
    }
    else{
       dispatch(wsOpenConnection({url:'wss://norma.nomoreparties.space/orders', user:true}))
    } 
    return () => {
      console.log('close')
      dispatch(wsClose());
    };
  },[dispatch, location.pathname])
  const idsArr:any = []

  store.orders.forEach((item:any) => {

    idsArr.push(item.ingredients)
  })

  const arrayInfo = idsArr.map((item:any) => {
   const tempArr:any = []
   const priceArr:any =[]
   const obj = {arr:tempArr, price: priceArr}
    item.forEach((id:string)=>{
      allIngredients.loadingData.forEach((ingredients) => {
        if (ingredients._id===id){
          priceArr.push(ingredients.price)
          tempArr.push(ingredients)
        }
    })
  })
  return obj
  })


  return (
    <ul
      className={styles.root}
    >
      {store.orders.map((item:any, index)=> { 
        return(
        <li className={styles.order} key={item.number}>
        <Link
          to={{ pathname: `/${link}/${item._id}`, state: {background: location} }}
          style={{ color: "#fff" }}
        >
          <span className={styles.id}>
            {'#'+item.number}
          </span>
          <span className={styles.time}>
            {item.createdAt}
          </span>
          <span className={styles.name}>
            {item.name}
          </span>
          {item.status && (
            <span
              className={styles.status}
            >
             {status(item.status)}
            </span>
          )}
          <ul className={styles.circles}>
          {arrayInfo[index].arr.map((ingregient:any, index:number)=> {
            return(
            <li className={styles.circle} key={index}>
              <img
                src={ingregient.image}
                width="60px"
                alt='Burger Ingredients'
              />
            </li>
          )})}
        </ul>
        <div className={styles.priceWrapper}>
            <span className={styles.price}>
              {arrayInfo[index].price.reduce((a:any,b:any)=>{
                return a+b
              })}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </Link>
      </li>
      )})}
    </ul>
  );
}

export default Feed;
