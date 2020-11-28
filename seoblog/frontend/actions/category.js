import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const create = (category, token) =>{
    
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

export const getCategories = ( ) =>{
    
    return fetch(`${API}/api/categories`,{
        method:'GET',
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}

export const getCategorY = (slug ) =>{
    
    return fetch(`${API}/api/categories/${slug}`,{
        method:'GET',
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}
export const singleCategory = (slug ) =>{
    
    return fetch(`${API}/api/category/${slug}`,{
        method:'GET',
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}
export const removeCategory = (slug, token) =>{
    
    return fetch(`${API}/api/category/${slug}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        }
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}