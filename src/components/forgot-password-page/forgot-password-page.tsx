import React, {useState, useCallback} from 'react'
import { Link, Redirect } from 'react-router-dom'
import { resetPasswordRequest } from '../../services/slices/authSlice'
import styles from './styles.module.css'
import { Input, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch, useAppSelector}  from '../../services/store'

const ForgotPasswordPage: React.FC=()=> {
  const store  = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch()
  const [data, setData] = useState({
    email: '',
    name: ''
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

  const onChange = (e:any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return(
        <div className={styles.root}>
          <div className = {styles.formWrapper}>
          <form onSubmit={resetPass} className = {styles.form}> 
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
              <Button >
                Восстановить
              </Button>
            </section>
          </form>
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

export default ForgotPasswordPage