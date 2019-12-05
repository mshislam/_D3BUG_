import axios from 'axios'

import {GET_USER} from './types'





export function setCurrentUser(users) {

    return {

      type: GET_USER,

      users


    };

  }

export const getuserbyid = () => dispatch => {


	axios.get('http://localhost:3001/api/users/login')



		.then(res =>{

            console.log(res)

            const newuser = res.data.Data

            setCurrentUser(newuser)

           

            console.log(newuser)

        }

         

		);



};