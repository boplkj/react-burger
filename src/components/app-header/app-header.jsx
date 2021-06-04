import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

export default function AppHeader() {

  return (
    <header className={styles.root}>

      <div className={styles.leftSide}>

        <section className={styles.menuTap} >
          <BurgerIcon/> 
          <span className={styles.text}>Конструктор</span>
        </section>

        <section className={styles.menuTap}>
          <ListIcon/> 
          <span className={styles.text}>Лента заказов</span>
        </section>

      </div>
      <div className = {styles.logo}>
        <Logo/>
      </div>

      <div className={styles.rightSide}>

        <section className={styles.menuTap} >
          <ProfileIcon/>
          <span className={styles.text}>Личный кабинет</span>
        </section>
      </div>
    </header> 

  )

}