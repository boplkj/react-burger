import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export default function AppHeader() {

  return (
    <header className={styles.root}>

      <div className={styles.leftSide}>
        
          <section className={styles.menuTap} >
            <BurgerIcon/> 
            <Link  to={'/'}>
            <span className={styles.text}>Конструктор</span>
            </Link>
          </section>
        

        <Link to={'/feed'}>
          <section className={styles.menuTap}>
            <ListIcon/> 
            <span className={styles.text}>Лента заказов</span>
          </section>
        </Link>
      </div>
      <Link to={'/'}>
        <div className = {styles.logo}>
          <Logo/>
        </div>
      </Link>

      <div className={styles.rightSide}>
        <Link to={'/profile'}>
        <section className={styles.menuTap} >
          <ProfileIcon/>
          <span className={styles.text}>Личный кабинет</span>
        </section>
        </Link>
      </div>
    </header> 

  )

}