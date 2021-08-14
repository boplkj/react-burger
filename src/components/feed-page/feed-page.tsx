import React ,{useMemo, useEffect, useState} from 'react'
import Feed from '../feed/feed'
import feedDataProgress from '../utils/feed-data-progress'
import styles from './styles.module.css'
import {  useSelector } from 'react-redux'
import {RootState}  from '../../services/store'

const FeedPage: React.FC=()=> {
  const items = useSelector((store:RootState) => store.orderFeed.orders)
  const store = useSelector((store:RootState) => store.orderFeed)
  const atWork:any = []
  const done:any =[]
  items.forEach((item:any)=>{
    item.status === 'done'? done.push(item): item.status === 'created'&& atWork.push(item)
  })
  return (
    <div className={styles.root}>
      <div className = {styles.feed}>
      <Feed link={'feed'}/>
      </div>
      <div className={styles.orderWrapper}>
        <div className={styles.orders}>
        <div className={styles.ready}>
          <span className={styles.text}>Готовы:</span>
          <div className={styles.column}>
          <ul>
            {done.slice(0,9).map((item:any) => (
                 <li key ={item._id} className={styles.complite}>{item.number}</li>
              ))
            }
          </ul>
          { (done.length>=10)&& 
          <ul className={styles.columnSec}>
            {done.slice(9,18).map((item:any) => (
                 <li key ={item._id} className={styles.complite}>{item.number}</li>
              ))
            }
          </ul>  }
          </div>
        </div>
        <div className={styles.atWork}>
          <span className={styles.text}>В работе:</span>
          <div className={styles.column}>
          <ul>
          {atWork.slice(0,9).map((item:any) => (
            <li className={styles.numberSmall}>{item.number}</li>
          ))
          }
          </ul>
          { (atWork.length>=10)&& 
          <ul className={styles.columnSec}>
            {done.slice(9,18).map((item:any) => (
                 <li className={styles.complite}>{item.number}</li>
              ))
            }
          </ul>  }
          </div>
        </div>
        </div>
        <div className={styles.textWrapper}>
        <span
          className={styles.text}>
          Выполнено за все время:
          </span>
        <span className={styles.numBig}>
          {store.total}
        </span>
        </div>
        <div className={styles.textWrapper} >
        <span className={styles.text}>
          Выполнено за сегодня:
        </span>
        <span
          className={styles.numBig}>
          {store.totalToday}
        </span>
        </div>
      </div>
    </div>
  )
}
export default FeedPage;

