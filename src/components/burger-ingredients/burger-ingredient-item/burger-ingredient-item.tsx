import React from 'react'
import styles from './styles.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'

import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom'
import {RootState}  from '../../../services/store'


interface IProp{
  data : any
}
const BurgerIngredientItem: React.FC<IProp> =({data}) => {
const location = useLocation();
const items = useSelector((store: RootState) => store.constructorList.items)
const bun = useSelector((store: RootState)=> store.constructorList.bun)

let count 
if (data.type ==='bun') {
  if (data._id === bun._id) {
    count = 2}
  else count = null
}else {
 count = items.filter(item => item.id===data._id).length>=1? items.filter(item => item.id===data._id).length: null

}


const [, drag, ] = useDrag(() => ({
  type:'item',
  item: data,
  collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
  }),
}), []);


  return(
  <Link to={{pathname: `/ingredients/${data._id}`, state: {background: location}}}>
      <div ref = {drag} className={styles.roott} id = 'drug' >
        <section className={styles.image}>
        {count && (
          <section className={styles.counter}>
          <Counter count={count} size="default" />
          </section>
          )
        }
          <img src={data.image} alt = {data.name}/>
          </section>
         <section className={styles.price} >
         <span className={styles.priceNum}>{data.price}</span>
         <CurrencyIcon type='secondary'/> 
       </section>
       <span className = {styles.itemName}>{data.name}</span>
       </div>
       </Link>
        )}

  
        export default BurgerIngredientItem