import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import Modal from '../../modal/modal'
import IngredientDetails from '../../modal/ingredients-details/ingredient-details'
import { useDrag } from 'react-dnd';

export default function BurgerIngredientItem({data}) {


const [isOpen, setIsOpen] = useState(false)

const items = useSelector(store => store.constructorList.items)
const bun = useSelector(store => store.constructorList.bun)

let count 
if (data.type ==='bun') {
  if (data._id === bun._id) {
    count = 1}
  else count = null
}else {
 count = items.filter(item => item.id===data._id).length>=1? items.filter(item => item.id===data._id).length: null

}


const [, drag, ] = useDrag(() => ({
  type:'item',
  item: data,
  collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
  }),
}), []);

  return(
    <>
      <div ref = {drag} className={styles.root} onClick={()=> setIsOpen(true)} >
       
        <section className={styles.image}>
        {count && (
          <section className={styles.counter}>
          <Counter count={count} size="default" />
          </section>
          )
        }
          <img src={data.image} alt = {data.name}/>
          </section>
         
         <section className={styles.price} >
         <span className={styles.priceNum}>{data.price}</span>
         <CurrencyIcon/> 
       </section>
       <span className = {styles.itemName}>{data.name}</span>
       </div>
       {
         isOpen && 
         <Modal handleClose = {() =>{setIsOpen(false)}} title='Детали ингредиента' >
         <IngredientDetails data={data}/>
        </Modal>
       }
       </>
        )}

        BurgerIngredientItem.propTypes = {
          data:PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
            image: PropTypes.string
            }).isRequired
        }; 
  