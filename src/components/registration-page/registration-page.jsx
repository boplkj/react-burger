import React, { useCallback ,useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { registerRequest } from '../../services/slices/authSlice'
import {PasswordInput, EmailInput, Logo, Button, Input} from '@ya.praktikum/react-developer-burger-ui-components'

export default function RegistrationPage() {
  const store  = useSelector((store) => store.auth);
  console.log(store)
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const register =useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerRequest(data))
    },
    [data, dispatch]
  )

  if (store.email) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    )
      };

  console.log('email', store.email)

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return(
        <div className={styles.root}>
          <div className = {styles.formWrapper}>
          <section className={styles.logo}>
            <Logo/>
          </section>
          <section className={styles.textWrapper}>
            <span className={styles.text}>Регистрация</span>
          </section>
          <section className={ styles.input} >
            <Input 
            placeholder={'Имя'}
            type={'text'} 
            name={'name'} 
            value={data.name}
            onChange={onChange}
            />
          </section>
          <section className={ styles.input} >
            <EmailInput 
            name={'email'} 
            value={data.email}
            onChange={onChange}
            />
          </section>
          <section className={styles.input}>
            <PasswordInput
            name={'password'} 
            value={data.password}
            onChange={onChange}
            />
          </section>
          <section className={styles.button}>
            <Button onClick={register} >
              Зарегистрироваться
            </Button>
          </section>
          <section className={styles.link}>
            <span className={`text text_type_main-default text_color_inactive`}>
              Уже зарегистрированы?
              <Link to={'/login'}>
                Войти
              </Link>
            </span>
          </section>

          </div>
        </div>
  ) 
}