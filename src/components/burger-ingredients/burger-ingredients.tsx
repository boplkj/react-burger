import React, {useRef} from 'react'
import {useSelector } from 'react-redux'
import styles from './styles.module.css'
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientItem from './burger-ingredient-item/burger-ingredient-item'
import { RootState } from '../../services/store'
 const BurgerIngredients: React.FC= () =>{
  const data = useSelector((store: RootState)=> store.ingredientsList.loadingData)
  const [current, setCurrent] = React.useState('one')

  const scrollRef = useRef<any>()
  const bunsRef = useRef<any>()
  const mainRef = useRef<any>()
  const sauceRef = useRef<any>()

const visible = (ref:any) =>{
  let targetPositionTop = window.pageYOffset + ref.current.getBoundingClientRect().top
  let targetPositionBottom = window.pageYOffset +  ref.current.getBoundingClientRect().bottom
  let windowPositionTop = window.pageYOffset
  let windowPositionBottom = window.pageYOffset + document.documentElement.clientHeight
  if (targetPositionBottom > windowPositionTop && targetPositionTop < windowPositionBottom) {
    return true
  } else {
    return false
  }
}


  const onScroll=()=>{
    const scrollTop = scrollRef.current.getBoundingClientRect().top
    const bunsTop = bunsRef.current.getBoundingClientRect().top
    const mainTop = mainRef.current.getBoundingClientRect().top
    const sauceTop = sauceRef.current.getBoundingClientRect().top

    const moduleLengthBuns = Math.abs(scrollTop - bunsTop)
    const moduleLengthMain = Math.abs(scrollTop - mainTop)
    const moduleLengthSause = Math.abs(scrollTop - sauceTop)

    const minLength = Math.min(moduleLengthBuns, moduleLengthMain, moduleLengthSause)
    if (minLength===moduleLengthBuns) {
      visible(bunsRef)&& setCurrent('one')
    }
    else if (minLength === moduleLengthMain ) {
      visible(mainRef)?
      setCurrent('two'): setCurrent('one')
    }
    else if (minLength === moduleLengthSause) {
      visible(sauceRef)?
      setCurrent('three'): setCurrent('two')
  }
}

  return(
        <div className={styles.root}>
          <span className={styles.title}>Соберите Бургер</span>
          <div className={styles.tabs}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
              Начинки
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
              Соусы
            </Tab>
          </div>
          <section ref={scrollRef} className={styles.scroll} onScroll={onScroll}>
            <section ref={bunsRef}>
              <span className={styles.categoryName}>Булки</span>
              <div className={styles.cardWrap}>
                {
                  data.map((item) => (item.type==='bun' && (
                    <section className ={styles.ingredientCard}  key={item._id} >
                    <BurgerIngredientItem  data={item}/>
                    </section>
                    )
                  ))
                }
              </div>
            </section>
            <section ref={mainRef}>
              <span className={styles.categoryName}>Начинки</span>
              <div className={styles.cardWrap}>
                {
                  data.map((item) => (item.type==='main' && (
                    <section className ={styles.ingredientCard} key={item._id}>
                    <BurgerIngredientItem  data={item} />
                    </section>
                    )
                  ))
                }
              </div>
            </section>
            <section ref={sauceRef}>
              <span className = {styles.categoryName}>Соусы</span>
              <div className = {styles.cardWrap}>
                {
                  data.map((item) => (item.type==='sauce' && (
                      <section className ={styles.ingredientCard} key={item._id} >
                      <BurgerIngredientItem data={item}/>
                      </section>
                      )
                    ))
                }
              </div>
            </section>
          </section>
        </div>
  ) 
}
export default BurgerIngredients