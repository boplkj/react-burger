import React, {useState, useEffect} from 'react'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import INGREDIENTS_API_URL from '../utils/url'
//import localData from '../utils/local-data'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './styles.module.css'


export default function App() {
const [loadingData, setLoadingData] = useState([])
const [loading, setLoading] = useState(true)
const[error, setError] = useState('')

  useEffect(() => {
    const getProductData = async () => {
      setLoading(true);
        const res = await fetch(INGREDIENTS_API_URL)
        if (res.ok) { 
          const dataConst = await res.json()
          setLoadingData(dataConst.data)
        } else {
          setError("Ошибка HTTP: " + res.status)
        }
        setLoading(false)
    }
    try{
    getProductData();
    } catch (e) {
      setError('Произошла какая-то ошибка')
    }
}, [])

  return(
    
        <>
        <section className={styles.header}>
          <AppHeader />
          </section>
          {!loading && !error
          ? <section className = {styles.roott}>
          <section className={styles.root} >
            <section className={styles.left}>
          <BurgerIngredients  data = {loadingData}/>
            </section>
            <section className={styles.right}>
          <BurgerConstructor  data = {loadingData}/>
            </section>
          </section>
          </section> 
          : loading
        ? <div>Загрузка</div> 
        : error&& <span>{error}</span>
        }
        </>
        )}