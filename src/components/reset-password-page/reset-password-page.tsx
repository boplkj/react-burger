import React, {useCallback, useState} from 'react'
import styles from './styles.module.css'
import { useAppSelector } from '../../services/store'
import { Link, Redirect } from 'react-router-dom'
import { changePasswordRequest } from '../../services/slices/authSlice'
import { Input, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch}  from '../../services/store'

const ResetPasswordPage: React.FC=() =>{
  const store  = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch()
  
  const [data, setData] = useState({
    token: '',
    password: ''
  });

  const restore =useCallback(
    (e) => {
      e.preventDefault();
      dispatch(changePasswordRequest(data))
    },
    [data, dispatch]
  )
  const onChange = (e:any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (!store.resetPassword) {
    return <Redirect to={'/login'} />;
  }
  
  return(
        <div className={styles.root}>
          <div className = {styles.formWrapper}>
            <form className = {styles.form} onSubmit={restore}>
          <section className={styles.logo}>
            <Logo/>
          </section>
          <section className={styles.textWrapper}>
            <span className={styles.text}>Восстановление пароля</span>
          </section>
          <section className={ styles.input} >
            <Input
             placeholder={'Введите код из письма'}
             type={'text'}
             name={'token'}
             onChange={onChange}
             value={data.token}
              />
          </section>
          <section className={styles.button}>
            <Button>
              Восстановить
            </Button>
          </section>
          </form>
          <section className={styles.link}>
            <section>
              <span className={`text text_type_main-default text_color_inactive mt-4`}>
                Вспомнили пароль?
                <Link to={'/login'}>
                  Восстановить пароль
                </Link>
              </span>
            </section>
          </section>
          </div>
        </div>
  ) 
}

export default ResetPasswordPage