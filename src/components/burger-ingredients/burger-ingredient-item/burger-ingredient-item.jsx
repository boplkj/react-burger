import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerIngredientItem({image, price, name}) {
  console.log(image)
  return(
      <div className={styles.root}>
        <section className={styles.image}>
          <img src={image} alt = ''/>
          </section>
         
         <section className={styles.price} >
         <span className={styles.priceNum}>{price}</span>
         <CurrencyIcon/> 
       </section>
       <span className = {styles.itemName}>{name}</span>
       
       </div>
        )}

        BurgerIngredientItem.propTypes = {
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired
        }; 
  