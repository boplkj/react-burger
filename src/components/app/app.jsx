import React, {useEffect} from 'react'
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
import ProtectedRoute from '../protected-route/protected-route'
import { BrowserRouter as Router, Route } from "react-router-dom";

//import localData from '../utils/local-data'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './styles.module.css'


export default function App() {
  const ingredientsList = useSelector(store => store.ingredientsList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  return(
    
      <>
      <Router>
        <section className={styles.header}>
          <AppHeader />
          </section>
          <section>
            <Route path="/feed">
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
            <ProtectedRoute path="/profile">
              <ProfilePage/>
            </ProtectedRoute>

            
          
          {
            !ingredientsList.loading && 
            !ingredientsList.error && 
            ingredientsList.loadingData.length !== 0

          ? (
            <Route path='/' exact={true}>
          <section className = {styles.roott}>
            <section className={styles.root} >
              <section className={styles.left}>
                <BurgerIngredients  data = {ingredientsList.loadingData}/>
              </section>
            <section className={styles.right}>
              <BurgerConstructor  data = {ingredientsList.loadingData}/>
            </section>
          </section>
          </section>
          </Route>
          ) : ingredientsList.loading? (
          <div>Загрузка</div> 
          )
          : ingredientsList.error&& (
          <span>{ingredientsList.error}</span>
          )
          }
          </Router>
        </>
        )}