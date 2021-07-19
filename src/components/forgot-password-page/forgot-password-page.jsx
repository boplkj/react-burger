import React, {useState, useCallback} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { resetPasswordRequest } from '../../services/slices/authSlice'
import styles from './styles.module.css'
import { Input, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components'



export default function ForgotPasswordPage() {
  const store  = useSelector((store) => store.auth);
  console.log(store)
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: ''
  });
  const resetPass =useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPasswordRequest(data))
    },
    [data, dispatch]
  )

  if (store.resetPassword) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    )
      };

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
            <span className={styles.text}>Восстановление пароля</span>
          </section>
          <section className={ styles.input} >
            <Input
            placeholder={'Укажите e-mail'}
            type={'text'}
            name={'name'} 
            value={data.name}
            onChange={onChange}
            />
          </section>
          <section className={styles.button}>
            <Button onClick={resetPass}>
              Восстановить
            </Button>
          </section>
          <section className={styles.link}>
            <section>
              <span className={`text text_type_main-default text_color_inactive mt-4`}>
                Вспомнили пароль?
                <Link  to={'/login'}>
                  Войти
                </Link>
              </span>
            </section>
          </section>
          </div>
        </div>
  ) 
}
