import fetch from 'isomorphic-fetch'
import cookie, { set } from 'js-cookie'
import { API } from '../config'

export const signup = (user) =>{
    
    return fetch(`${API}/api/signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}

export const signin = (user) =>{
    
    return fetch(`${API}/api/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}

//Set cookie
export const setCookie = (key, value) =>{
    if (process.browser) {
        cookie.set(key, value, {
            expires:1
        })
    }
}
//Remove cookie
export const removeCookie = (key) =>{
    if (process.browser) {
        cookie.remove(key, {
            expires:1
        })
    }
}
//Get Cookie
export const getCookie = (key) =>{
    if (process.browser) {
      return  cookie.get(key)
    }
}
//localstorage
export const setLocalStorage = (key, value) =>{
     if (process.browser) {
         localStorage.setItem(key, JSON.stringify(value))
     }
}

export const removeLocalStorage = (key) =>{
    if (process.browser) {
        localStorage.removeItem(key) 
    }
}
//authenticate user by pass data to cookie and localstorage  
export const authenticate = (data, next) =>{
      setCookie('token', data.token)
      setLocalStorage('user', data.user)
      next()
}

export const isAuth = () =>{
    if (process.browser) {
        const cookieCheked = getCookie('token')
        if (cookieCheked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false
            }
        }
    }
}