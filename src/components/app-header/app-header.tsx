import React from 'react'
import styles from './styles.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'



const AppHeader: React.FC= () =>{

  return (
    <header className={styles.root}>
      <div className={styles.leftSide}>
          <section className={styles.menuTap} >
            <BurgerIcon type='secondary' /> 
            <Link  to={'/'}>
            <span className={styles.text}>Конструктор</span>
            </Link>
          </section>
        <Link to={'/feed'}>
          <section className={styles.menuTap}>
            <ListIcon type='secondary'/> 
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
          <ProfileIcon type='secondary'/>
          <span className={styles.text}>Личный кабинет</span>
        </section>
        </Link>
      </div>
    </header> 

  )

}
export default AppHeader