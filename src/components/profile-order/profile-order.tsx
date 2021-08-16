import React, {useEffect, useState} from 'react'
import styles from './styles.module.css'
import { userInfoRequest, logoutRequest } from '../../services/slices/authSlice'
import { Link, useLocation } from 'react-router-dom'
import Feed from '../feed/feed'
import { useAppDispatch, useAppSelector}  from '../../services/store'

const ProfileOrder: React.FC=() =>{
  const location = useLocation()
  console.log(location.pathname,'ffffff')
  const store  = useAppSelector((store) => store.auth);
  const [active] = useState({profile:false, history:true, exit:false})

 
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(userInfoRequest())
  }, [])

  const bla =() => {
    dispatch(logoutRequest())
   return <Link to={'/'}/>
  }
  

  return(
        <div className={styles.root}>
          <div className = {styles.links}>
            <section className={styles.link}>
            <Link
              to={'/profile'}
            >
              <span className={active.profile? styles.active : styles.text }>Профиль</span>
              </Link>
            </section>
            <section className={styles.link}>
            <Link
              to={'/profile/orders'}
            >
              <span className={active.history? styles.active : styles.text }>История заказов</span>
              </Link>
            </section>

              
            <section className={ styles.link} >
              <Link
              onClick={bla}
              to={'/'}
            >
              <span className={active.exit? styles.active : styles.text }>Выход</span>
              </Link>
            </section>

            <section className={ styles.textInfo} >
              <span className={styles.textSmall}>В этом разделе вы можете изменить свои персональные данные</span>
            </section>
          </div>
        <div className={styles.feed}> 
        <Feed link= {'profile/orders'}/>
        </div>
        
        </div>
  ) 
}
export default ProfileOrder