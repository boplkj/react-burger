import React, {useCallback, useState} from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import {PasswordInput, EmailInput, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { loginRequest } from '../../services/slices/authSlice'
import { useAppDispatch, useAppSelector}  from '../../services/store'

const LoginPage: React.FC=() =>{
  const store  = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch()
  
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const login =useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequest(data))
    },
    [data, dispatch]
  )
  const onChange = (e:any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const location = useLocation<any>();

  if (store.email) {
    return <Redirect to={ '/'} />;
  }
  
  return(
        <div className={styles.root}>
          <div className = {styles.formWrapper}>
            <form className = {styles.form} onSubmit={login}>
          <section className={styles.logo}>
            <Logo/>
          </section>
          <section className={styles.textWrapper}>
            <span className={styles.text}>Вход</span>
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
            <Button >
              Войти
            </Button>
          </section>
          </form>
          <section className={styles.links}>
            <section >
              <span className={`text text_type_main-default text_color_inactive`}>
                Вы - новый пользователь?
                <Link to={'/register'}>
                  Зарегистрироваться
                </Link>
              </span>
            </section>
            <section>
              <span className={`text text_type_main-default text_color_inactive mt-4`}>
                Забыли пароль?
                <Link to={'/forgot-password'}>
                  Восстановить пароль
                </Link>
              </span>
            </section>
          </section>

          </div>
        </div>
  ) 
}

export default LoginPage