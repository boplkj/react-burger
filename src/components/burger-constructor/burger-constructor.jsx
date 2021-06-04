import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import {CurrencyIcon, DragIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components'

export default function BurgerConstructor({data}) {
  const bulki = data.filter(item=> item.type==='bun')
  const otherIngredients = data.filter(item=> item.type!=='bun')
  const sum = data.reduce((acc,val)=> acc + val.price,0)

  return(
    <div className={styles.root}>
      <section className={styles.topBulka}>
      <ConstructorElement
      type="top"
      isLocked={true}
      text={bulki[0].name}
      price={bulki[0].price}
      thumbnail={bulki[0].image}
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
      <section className={styles.bottomBulka}>
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={bulki.length===1? bulki[0].name: bulki[bulki.length-1].name}
      price={bulki.length===1? bulki[0].price: bulki[bulki.length-1].price}
      thumbnail={bulki.length===1? bulki[0].image: bulki[bulki.length-1].image}
    /> 
    </section>
        <section className={styles.sum}> 
          <span className = {styles.sumText}>{sum}</span>
          <CurrencyIcon/>
          <section className={styles.button}>
          <Button type="primary" size="large" >
            Оформить заказ
          </Button>
          </section>
          </section>
       </div>
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
