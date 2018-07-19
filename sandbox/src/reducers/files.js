const initialState = [
    'My work filelist',
    'My saved filelist'
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