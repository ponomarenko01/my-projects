var mockApiData = [
    {
      id: 1,
      name: 'HTML code'
    },
    {
      id: 2,
      name: 'CSS code'
    },
    {
      id: 3,
      name: 'JS code'
    },
    {
      id: 4,
      name: 'NODE code'
    }
  ];
  
  export const getCodes = () => dispatch => {
    setTimeout(() => {
      console.log('I got part of code');
      dispatch({ type: 'FETCH_CODES_SUCCESS', payload: mockApiData })
    }, 2000)
  }