import React from 'react'
import PropTypes from 'prop-types'
//import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'
 
export default function IngredientDetails({data}) {

  return(
    <div className={styles.root}>
      <section className={styles.ingredientHeader}>
      <img src={data.image} className={styles.ingredientImage} alt='' />

        <section className={styles.itemName} >
          <span className={styles.orderNumber}>{data.name}</span>
          </section>
          </section>
        
        <section className= {styles.ingredientTable}>

        <section className={styles.ingredientCell}>
        <span className = {styles.tableItemText}>Каллории,ккал</span>
          <span className={styles.tableItemNumber}>{data.calories}</span>
        </section>

        <section className={styles.ingredientCell}>
        <span className = {styles.tableItemText}>Белки, г</span>
        <span className={styles.tableItemNumber}>{data.proteins}</span>
        </section>

        <section className={styles.ingredientCell}>
        <span className = {styles.tableItemText}>Жиры, г</span>
        <span className={styles.tableItemNumber}>{data.fat}</span>
        </section>

        <section className={styles.ingredientCell}>
        <span className = {styles.tableItemText}>Углеводы, г</span>
        <span className={styles.tableItemNumber}>{data.carbohydrates}</span>
        </section>

        </section>
      </div>
        )
      }
      
      IngredientDetails.propTypes = {
        data: PropTypes.shape({
          image: PropTypes.string,
          name: PropTypes.string,
          calories: PropTypes.number,
          proteins: PropTypes.number,
          fat: PropTypes.number,
          carbohydrates: PropTypes.number
          }).isRequired
      }; 