import React, {useEffect} from 'react'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import { useDispatch, useSelector } from 'react-redux'
import { getIngridients } from '../../services/slices/ingredientsListSlice'

//import localData from '../utils/local-data'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './styles.module.css'


export default function App() {
  const ingredientsList = useSelector(store => store.ingredientsList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIngridients())
  },[dispatch])

  return(
    
        <>
        <section className={styles.header}>
          <AppHeader />
          </section>
          {
            !ingredientsList.loading && 
            !ingredientsList.error && 
            ingredientsList.loadingData.length !== 0

          ? (
          <section className = {styles.roott}>
            <section className={styles.root} >
              <section className={styles.left}>
                <BurgerIngredients  data = {ingredientsList.loadingData}/>
              </section>
            <section className={styles.right}>
              <BurgerConstructor  data = {ingredientsList.loadingData}/>
            </section>
          </section>
          </section>
          ) : ingredientsList.loading? (
          <div>Загрузка</div> 
          )
          : ingredientsList.error&& (
          <span>{ingredientsList.error}</span>
          )
          }
        </>
        )}