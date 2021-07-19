import React from 'react'
import { Link } from 'react-router-dom'
import Feed from '../feed/feed'
import feedDataProgress from '../utils/feed-data-progress'
import styles from './styles.module.css'

function FeedPage() {
  return (
    <div className={styles.root}>
      <div className = {styles.feed}>
      <Feed/>
      </div>
      <div className={styles.orderWrapper}>
        <div className={styles.orders}>
        <div className={styles.ready}>
          <span className={styles.text}>Готовы:</span>
          <ul>
            {feedDataProgress.map((item) => (
                item.status==='Complite' && <li className={styles.complite}>{item.id}</li>
              ))
            }
          </ul>
        </div>
        <div className={styles.atWork}>
          <span className={styles.text}>В работе:</span>
          <ul>
          {feedDataProgress.map((item) => (
            item.status==='AtWork' && <li className={styles.numberSmall}>{item.id}</li>
          ))
          }
          </ul>
        </div>
        </div>
        <div className={styles.textWrapper}>
        <span
          className={styles.text}>
          Выполнено за все время:
          </span>
        <span className={styles.numBig}>
          28 752
        </span>
        </div>
        <div className={styles.textWrapper} >
        <span className={styles.text}>
          Выполнено за сегодня:
        </span>
        <span
          className={styles.numBig}>
          138
        </span>
        </div>
      </div>
    </div>
  )
}
export default FeedPage;

