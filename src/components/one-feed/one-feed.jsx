import React, {useState, useEffect} from 'react'
import styles from './styles.module.css'
import feedData from '../utils/feed-data'
import {  useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
export default function OneFeed() {

  const [data, setData] = useState({})
  const location = useLocation()

const id = location.pathname.split('0')[1]
console.log(location, 'location')

useEffect(
  () => {
    feedData.forEach((item)=> {
      if (item.id === '0'+id){
        setData(item)
      }
    })
  },
  [id]
)

console.log( 'gggg', id, data)

  return(
    <div className={styles.root}>
      <div className={styles.rootWrapper}>
          <span className={styles.id}>
            {'#'+data.id}
          </span>
          <span className={styles.time}>
            {data.time}
          </span>
          <span className={styles.name}>
            {data.name}
          </span>
          {data.status && (
            <span
              className={styles.status}
            >
             {data.status}
            </span>
          )}
          <ul className={styles.circles}>
          {data.images && data.images.map((ingregient, index)=> {
            return(
            <li className={styles.circle} key={index}>
              <img
                src={ingregient}
                width="60px"
                alt='Burger Ingredients'
              />
            </li>
          )})}
        </ul>
        <div className={styles.priceWrapper}>
            <span className={styles.price}>
              {data.price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          </div>
        </div>)}
        
  