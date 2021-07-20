import React, {useEffect, useMemo} from 'react'
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import LoginPage from '../login-page/login-page'
import RegistrationPage from '../registration-page/registration-page'
import ForgotPasswordPage from '../forgot-password-page/forgot-password-page'
import ResetPasswordPage from '../reset-password-page/reset-password-page'
import FeedPage from '../feed-page/feed-page'
import ProfilePage from '../profile-page/profile-page'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients } from '../../services/slices/ingredientsListSlice'
import { userInfoRequest } from '../../services/slices/authSlice'

import ProtectedRoute from '../protected-route/protected-route'
import {  Route , Switch, useLocation, useHistory} from "react-router-dom";
import Modal from '../modal/modal'
import IngredientDetails from '../modal/ingredients-details/ingredient-details'
import {getCookie} from '../../services/cookie'
import OneFeed from '../one-feed/one-feed'
import ProfileOrder from '../profile-order/profile-order'
//import localData from '../utils/local-data'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './styles.module.css'


export default function App() {
  const location = useLocation();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state && location.state.background
  const undo = () => {
    history.goBack();
}
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  const cookie = getCookie("accessToken")
  const email  = useSelector((store) => store.auth.email);
  useMemo(() => {
    if (cookie && !email) {
       dispatch(userInfoRequest())
    }
  }, [email,dispatch,cookie])

  console.log(cookie, 'cookie')

  return(
    
      <>

        <section className={styles.header}>
          <AppHeader/>
          </section>
          <section>
            <Route exact={true} path="/feed">
              <FeedPage/>
            </Route>
          </section>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegistrationPage />
            </Route>
            <Route path="/forgot-password">
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password">
              <ResetPasswordPage/>
            </Route>
            <ProtectedRoute exact={true}  path="/profile">
              <ProfilePage/>
            </ProtectedRoute>
            <ProtectedRoute exact={true} path="/profile/orders">
              <ProfileOrder/>
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders/:id">
              <OneFeed/>
            </ProtectedRoute>
            
            <Route path="/feed/:id">
              <OneFeed/>
            </Route>

            <Switch location={background || location}>
            <Route path='/' exact={true}>
          <section className = {styles.roott}>
            <section className={styles.root} >
              <section className={styles.left}>
                <BurgerIngredients/>
              </section>
            <section className={styles.right}>
              <BurgerConstructor/>
            </section>
          </section>
          </section>
          </Route>
          </Switch>
          {background? (
          <Route path='/ingredients/:id'>
            <Modal handleClose={undo} title={'Детали ингредиента'} >
                <IngredientDetails/>
            </Modal>
          </Route>): 
          (
          <Route path='/ingredients/:id'>
            <IngredientDetails/>
          </Route>
          )
                    }

        </>
        )}