const initialState = [
    'HTML',
    'CSS',
    'JS'
  ];
  
  export default function files(state = initialState, action) {
    if (action.type === 'ADD_FILE'){
        console.log('action.payload', action.payload)
        return [
          ...state,
          action.payload
        ];
      }
      return state;
  }