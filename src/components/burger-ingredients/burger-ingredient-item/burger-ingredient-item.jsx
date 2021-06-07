import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../modal/modal'
import IngredientDetails from '../../modal/ingredients-details/ingredient-details'

export default function BurgerIngredientItem({data, count}) {
const [handleClose ,setHandleClose] = useState(false)
console.log(count)
  return(
    <>
      <div className={styles.root} onClick={()=> setHandleClose(true)} >
       
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
       {
         handleClose && 
         <Modal handleClose = {() =>{setHandleClose(false)}} title='Детали ингредиента' >
         <IngredientDetails data={data}/>
        </Modal>
       }
       </>
        )}

        BurgerIngredientItem.propTypes = {
          data:PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            image: PropTypes.string
            }).isRequired
        }; 
  