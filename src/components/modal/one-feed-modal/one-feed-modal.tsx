import React, {useState, useEffect, useMemo} from 'react'
import styles from './styles.module.css'
import {  useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { getFeed } from '../../../services/slices/oneFeedSlice'
import { useSelector } from 'react-redux'
import {RootState, useAppDispatch}  from '../../../services/store'

const OneFeedModal:React.FC =() => {
  const location = useLocation()
  const id = location.pathname.split('feed/')[1]
  console.log(id, 'id?')
  const [data, setData] =useState<any>([])
  let price
  const dispatch = useAppDispatch()
  const dataArr = useSelector((store:RootState) => store.oneFeed.order)
  const allIngredients = useSelector((store:RootState) => store.ingredientsList)
  useEffect(()=>{
    dispatch(getFeed(id))
  },[dispatch, id])

  useMemo(()=>{
    if (dataArr.length){
      setData(dataArr)
    }
  },[dataArr])

let arrayInfo:any = []
if (data.length){
   arrayInfo = data.map((item:any) => {
    const tempArr:any = []
    const priceArr:any =[]
     item.ingredients.forEach((ingredient:any)=>{
       allIngredients.loadingData.forEach((ingredients) => {
         if (ingredients._id===ingredient){
           priceArr.push(ingredients.price)
           tempArr.push(ingredients)
         }
     })
   })
   if (priceArr.length){
   price = priceArr.reduce((a:any, b:any) => {
    return a + b
})
   }
   return tempArr
   })
  }


  return(
  <>
    {data.length?
    <div className={styles.root}>
      <div className={styles.rootWrapper}>
          <span className={styles.id}>
            {'#'+data[0].number}
          </span>
          <span className={styles.name}>
            {data[0].name}
          </span>
          {data[0].status && (
            <span
              className={styles.status}
            >
             {data[0].status}
            </span>
          )}
          <ul className={styles.circles}>
          {arrayInfo.length && arrayInfo[0].map((ingregient:any, index:number)=> {
            return(
              <div className={styles.ingregientWrapper}>
            <li className={styles.circle} key={index}>
              <img
                src={ingregient.image}
                width="60px"
                alt='Burger Ingredients'
              />
            </li>
            <div className= {styles.priceWrapper}>
            <span className={styles.text}>{ingregient.name}</span>
            <div className={styles.price}>
            <CurrencyIcon type="primary" />
            <span>{ingregient.price}</span>
            </div>
            </div>
            </div>
          )})}
        </ul>
        <div className={styles.fullPriceWrapper}>
          <span className={styles.time}>
            {data[0].createdAt}
          </span>
          <div className={styles.price}>
            <span className={styles.price}>
              {price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          </div>
          </div>
        </div>
      :<span>К сожалению сервер не передал данные по запросу {`https://norma.nomoreparties.space/api/orders/${id}`} </span> }
        </>
            
        )
        }
        
  export default OneFeedModal