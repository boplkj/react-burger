import React from 'react'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import data from '../burger-data/burger-data'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './styles.module.css'


export default function App() {

  return(
        <>
        <section className={styles.header}>
          <AppHeader />
          </section>
          <section className = {styles.roott}>
          <section className={styles.root} >
            <section className={styles.left}>
          <BurgerIngredients  data = {data}/>
            </section>
            <section className={styles.right}>
          <BurgerConstructor  data = {data}/>
            </section>
          </section>
          </section>
        </>
        )}