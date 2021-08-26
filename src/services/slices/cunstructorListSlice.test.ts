import reducer, {addIngredient, removeIngredient} from './constructorListSlice'


const initialState ={
  items: [],
  bun: {
    name: 'Это место зарезервировано под Булку',
    image: 'q.png',
    price: 0
   },
  sum: 0, 
}

const state ={
  bun: {
    image: "q.png",
     name: "Это место зарезервировано под Булку"},
  items: [
    {
      _id: 570493194297934,
      id: 3020,
      image: "src",
      name: "name",
      price: 100,
      type: "sause"
    },
    {
      _id: 5704931437934,
      id: 30230,
      image: "src",
      name: "name",
      price: 1000,
      type: "sause"
    }],
  sum: 1100
}
const ingregient ={
      _id: 570493194297934,
      id: 3020,
      image: "src",
      name: "name",
      price: 100,
      type: "sause"
}

describe('constructorList', () => {
  it("Должен вернуть initialDataState", () =>{
  expect(reducer(undefined, {})).toEqual(
    initialState
  )
})

  it("Должен добавить булку", () => {
    const payload = {type:'bun', _id:3000, price:3444, image: 'src', name:'name'}
    const reduce = reducer(initialState, addIngredient(payload));
    const result = {
      items: [],
       sum: payload.price*2,
        bun:{
          _id:payload._id,
          price: payload.price,
          type: payload.type,
          name: payload.name,
          image: payload.image,
      }};
    expect(reduce).toEqual(result);
  });

  // it("Должен добавить item", () => {
  //   const payload = {type:'sause', _id:3020, price:344, image: 'src', name:'name'}
  //   const reduce = reducer(initialState, addIngredient(payload));
  //   const result = {
  //     bun: initialState.bun,
  //      sum: payload.price,
  //      items:{
  //         _id: ???
  //         id:payload._id,
  //         price: payload.price,
  //         type: payload.type,
  //         name: payload.name,
  //         image: payload.image,
  //     }};
  //   expect(reduce).toEqual(result);
  // });


  it("Должен удалить item", () => {
    const reduce = reducer(state, removeIngredient(ingregient));
    const result = {...state, items:state.items.splice(1, 1), sum:1000}
    expect(reduce).toEqual(result);
  });
  

})
