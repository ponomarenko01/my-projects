const initialState = [
    'Type your code',
    'This is your space'
  ]
  
  export default function letters(state = initialState, action) {
    // if (state === undefined){
    //     return page;
    // }
    // if (action.type === 'DATA'){
    //   console.log(action.data)
    //   return action.data.snippet;
    // }
    if (action.type === 'ADD_CODE'){
      console.log('action.payload', action.payload)
      return [
        ...state,
        action.payload
      ];
    }
    return state;
  }