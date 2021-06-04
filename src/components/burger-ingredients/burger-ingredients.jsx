import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientItem from './burger-ingredient-item/burger-ingredient-item'

export default function BurgerIngredients({data}) {
  
  const [current, setCurrent] = React.useState('one')

  console.log(data)
  return(
        <div className={styles.root}>
          <span className={styles.title}>Соберите Бургер</span>
          <div className={styles.tabs}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
              Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
          <section className={styles.scroll}>
            <section>
           <span className = {styles.categoryName}>Булки</span>
          <div className = {styles.cardWrap}>
            {
            data.map(item => (item.type==='bun' &&
              <section className ={styles.ingredientCard}  key={item._id} >
              <BurgerIngredientItem image={item.image} price={item.price} name={item.name}/>
              </section>
            ))
          }
        </div>
        </section>
        <section>
           <span className = {styles.categoryName}>Начинки</span>
          <div className = {styles.cardWrap}>
            {
            data.map(item => (item.type==='main' &&
              <section className ={styles.ingredientCard} key={item._id}>
              <BurgerIngredientItem image={item.image} price={item.price} name={item.name}/>
              </section>
            ))
          }
        </div>
        </section>
        <section>
           <span className = {styles.categoryName}>Соусы</span>
          <div className = {styles.cardWrap}>
            {
            data.map(item => (item.type==='sauce' &&
              <section className ={styles.ingredientCard} key={item._id} >
              <BurgerIngredientItem image={item.image} price={item.price} name={item.name}/>
              </section>
            ))
          }
        </div>
        </section>
        </section>
        </div>
  ) 
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
    })
  ).isRequired
}; 
