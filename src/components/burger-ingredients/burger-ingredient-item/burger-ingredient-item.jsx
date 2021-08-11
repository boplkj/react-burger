import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'

import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom'

export default function BurgerIngredientItem({data}) {
const location = useLocation();
const items = useSelector(store => store.constructorList.items)
const bun = useSelector(store => store.constructorList.bun)

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
    <>
  <Link to={{pathname: `/ingredients/${data._id}`, state: {background: location}}}>
      <div ref = {drag} className={styles.root} >
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
         <CurrencyIcon/> 
       </section>
       <span className = {styles.itemName}>{data.name}</span>
       </div>
       </Link>
       </>
        )}

        BurgerIngredientItem.propTypes = {
          data:PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            image: PropTypes.string
            }).isRequired
        }; 
  