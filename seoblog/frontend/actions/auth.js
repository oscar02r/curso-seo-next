import fetch from 'isomorphic-fetch'
import cookie from 'js-cookie'
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
export const signout = (next)=>{
    removeCookie('token')
    removeLocalStorage('user')
    next()
    return fetch(`${API}/api/signout`,{
        method:'GET'
    })
    .then(response =>{
        console.log('signout success')
    })
    .catch(console.log)
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

export const updateUser = ( user, next)=>{
            if (process.browser) {
                if (localStorage.getItem('user')) {
                    let auth = JSON.parse(localStorage.getItem('user'))
                    auth = user
                    localStorage.setItem('user', JSON.stringify(auth))
                    next()
                }
            }
}