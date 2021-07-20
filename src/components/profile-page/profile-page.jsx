import React, {useEffect, useState, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { userInfoRequest, userUpdateInfoRequest, logoutRequest } from '../../services/slices/authSlice'
import { Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'
import Feed from '../feed/feed'

export default function ProfilePage() {
  const location = useLocation()
  console.log(location.pathname,'ffffff')
  const store  = useSelector((store) => store.auth);
  const [active] = useState({profile:true, history:false, exit:false})
  const [disableName, setDisableName] = useState(true)
  const [disableEmail, setdisableEmail] =useState(true)
  const [disablePass, setDisablePass] = useState(true)
 
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: store.email,
    password: '',
    name: store.name
  });

  useEffect(() => {
    dispatch(userInfoRequest())
  }, [])

  useEffect(() => {
    setData({ email: store.email, name: store.name, })
  }, [store])

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const save =useCallback(
    (e) => {
      e.preventDefault();
      dispatch(userUpdateInfoRequest(data))
    },
    [data, dispatch]
  )
  const bla =() => {
    dispatch(logoutRequest())
   return <Link to={'/'}/>
  }
  

  return(
        <div className={styles.root}>
          <div className = {styles.links}>
            <section className={styles.link}>
            <Link
              exact={true}
              to={'/profile'}
            >
              <span className={active.profile? styles.active : styles.text }>Профиль</span>
              </Link>
            </section>
            <section className={styles.link}>
            <Link
              exact={true}
              to={'/profile/orders'}
            >
              <span className={active.history? styles.active : styles.text }>История заказов</span>
              </Link>
            </section>

              
            <section className={ styles.link} >
              <Link
              exact={true}
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
          {location.pathname==='/profile' ?
          <div className={styles.inputWrapper}>
            <form onSubmit={save}>
            <section className={styles.input} >
              <Input 
                placeholder={'Имя'}
                type={'text'} 
                name={'name'} 
                value={data.name}
                onChange={onChange}
                disabled={disableName}
                icon ={disableName? 'EditIcon': 'CloseIcon'}
                onIconClick={() => {
                  setDisableName(!disableName)
                }}
                onBlur={() => {
                  setDisableName(true)
              }}
              />
            </section>
            <section className={styles.input}>
              <Input 
              name={'email'} 
              placeholder={'Логин'}
              value={data.email}
              disabled={disableEmail}
              icon ={disableEmail? 'EditIcon': 'CloseIcon'}
              onChange={onChange}
              onIconClick={() => {
                setdisableEmail(!disableEmail)
              }}
              onBlur={() => {
                setdisableEmail(true)
              }}
              />
            </section>
            <section className={styles.input}>
              <Input 
                name={'password'} 
                placeholder={'Пароль'}
                value={data.password}
                type={'password'}
                onChange={onChange}
                disabled={disablePass}
                icon ={disablePass? 'EditIcon': 'CloseIcon'}
                onIconClick={() => {
                  setDisablePass(!disablePass)
                }}
                onBlur={() => {
                  setDisablePass(true)
                }}
                  />
            </section>
            <section className={styles.buttons}>
              <section>
                <span> Отмена </span>
              </section>
              <section className={styles.saveBtn}>
                <Button onClick={save}>
                  Сохранить
                </Button>
              </section>
            </section>
            </form>
          </div>
        :
        <div className={styles.feed}> 
        <Feed link= {'profile/orders'}/>
        </div>
        }
        
        </div>
  ) 
}
