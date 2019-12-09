import axios from 'axios';


function loadFromLocalStorage(){

  try{

      const serializedstate = localStorage.getItem('jwtToken')

      if(serializedstate==null) return undefined

   

      console.log(serializedstate)

      return (serializedstate)

  
  }catch(e){

  console.log(e)

  return undefined

  }

  }

export default function setAuthorizationToken() {

  if (loadFromLocalStorage()) {

  const x = loadFromLocalStorage()

    axios.defaults.headers.common['Authorization'] = `${x}`;

  } else {


    delete axios.defaults.headers.common['Authorization'];


  }


}