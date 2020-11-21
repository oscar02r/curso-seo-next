import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const create = (category, token) =>{
    console.log(token)
    return fetch(`${API}/api/category`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify(category)
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}