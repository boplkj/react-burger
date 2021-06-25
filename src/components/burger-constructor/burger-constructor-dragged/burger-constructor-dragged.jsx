import React, {useRef} from 'react'
import styles from '../styles.module.css'
import { useDispatch } from 'react-redux'
import { changeIndex, removeIngredient } from '../../../services/slices/constructorListSlice'
import { useDrag, useDrop } from 'react-dnd'
import { DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'

 
export default function BurgerConstructorDragged({item, index}) {
  const dispatch = useDispatch()
  const [, drag, ] = useDrag(() => ({
    type:'sort',
    item: {index},
    collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
    }),
  }), []);
  const ref = useRef()

  const [, drop] = useDrop({
    accept: 'sort',
    hover(item, monitor) {
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
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (startIndex < endIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (startIndex > endIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        dispatch(changeIndex({startIndex, endIndex}))
        item.index = endIndex;
    },
  });
   drag(drop(ref));

  return(
        <>
          <section ref={ref} key={item._id} className={styles.ingredientMargin}>
            <DragIcon/>
              <ConstructorElement
                handleClose={()=>dispatch(removeIngredient(item))}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
          </section>
          </>
        )
      }