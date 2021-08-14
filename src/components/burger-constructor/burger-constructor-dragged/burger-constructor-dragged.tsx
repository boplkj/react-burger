import React, {useRef} from 'react'
import styles from '../styles.module.css'
import {useAppDispatch} from '../../../services/store'
import { changeIndex, removeIngredient } from '../../../services/slices/constructorListSlice'
import { useDrag, useDrop } from 'react-dnd'
import { DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import {IItem} from '../../../services/slices/constructorListSlice'

 interface IProps {
   item: IItem
   index: number
 }
const BurgerConstructorDragged: React.FC<IProps> =({item, index})=>{
  const dispatch = useAppDispatch()
  const [, drag, ] = useDrag(() => ({
    type:'sort',
    item: {index},
  }), []);
  const ref = useRef<any>()

  const [, drop] = useDrop({
    accept: 'sort',
    hover(item:any, monitor) {
        if (!ref.current) {
            return;
        }
        const startIndex = item.index;
        const endIndex = index;

        if (startIndex === endIndex) {
            return;
        }
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();

        const hoverClientY = clientOffset?.y || 0 - hoverBoundingRect.top;
        // if (startIndex < endIndex && hoverClientY < hoverMiddleY) {
        //     return;
        // }
        // if (startIndex > endIndex && hoverClientY > hoverMiddleY) {
        //     return;
        // }
        dispatch(changeIndex({startIndex, endIndex}))
        item.index = endIndex;
    },
  });
   drag(drop(ref));

  return(
        <>
          <section ref={ref} key={item._id} className={styles.ingredientMargin}>
            <DragIcon type='secondary'/>
              <ConstructorElement
                handleClose={()=>dispatch(removeIngredient({...item, index}))}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
          </section>
          </>
        )
  
      }
     
      export default BurgerConstructorDragged