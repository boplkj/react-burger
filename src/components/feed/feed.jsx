import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import feedData from '../utils/feed-data'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

function Feed({link, status }) {
  return (
    <ul
      className={styles.root}
    >
      {feedData.map((item)=> { 
        return(
        <li className={styles.order} key={item.id}>
        {/* <Link
          to={{ pathname: `/${props.link}/${item.id}` }}
          style={{ color: "#fff" }}
        > */}
          <span className={styles.id}>
            {'#'+item.id}
          </span>
          <span className={styles.time}>
            {item.time}
          </span>
          <span className={styles.name}>
            {item.name}
          </span>
          {status && (
            <span
              className={styles.status}
            >
             {item.status}
            </span>
          )}
          <ul className={styles.circles}>
          {item.images.map((ingregient, index)=> {
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
              {item.price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        {/* </Link> */}
      </li>
      )})}
    </ul>
  );
}
Feed.propTypes = {
  link: PropTypes.string.isRequired,
  status: PropTypes.bool,
};
export default Feed;
