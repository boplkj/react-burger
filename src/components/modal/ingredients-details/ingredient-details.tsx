import React, {useMemo, useState} from 'react'
import {useAppSelector} from '../../../services/store'
import { useLocation} from "react-router-dom";
//import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

import {IData} from '../../../services/slices/ingredientsListSlice'

const IngredientDetails: React.FC=() =>{
  const ingredientsArr = useAppSelector((store) => store.ingredientsList.loadingData)
  const location = useLocation();
  const [data, setData] = useState<IData>({})

  const id =location.pathname.split('/ingredients/')[1]

  useMemo(
    () => {
      ingredientsArr.forEach((item)=> {
        if (item._id === id){
          setData(item)
        }
      })
    },
    [id,ingredientsArr]
  )
  return(
    <div className={styles.root}>
      <div className= {styles.wrapper}>
      <section className={styles.ingredientHeader}>
      <img src={data.image} className={styles.ingredientImage} alt={data.name} />

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
      </div>
        )
      }

      export default IngredientDetails
      