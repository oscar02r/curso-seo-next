import fetch from 'isomorphic-fetch'
import { API } from '../config'


export const createBlog = (blog, token) =>{
    
    return fetch(`${API}/api/blog`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Authorization':`Bearer ${token}`,
        },
        body:blog
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}

export const listBlogsWithCategoriesAndtags = (skip, limit) =>{
    const data ={
        skip,
        limit
    }
    return fetch(`${API}/api/blog-categories-tags`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}

export const singleBlog = (slug) =>{
    return fetch(`${API}/api/blog/${slug}`,{
        method:'GET'
    }).then( response =>{
        return response.json()
    })
    .catch(console.log)
}

export const listRelated = (blog) =>{

    return fetch(`${API}/api/blogs/related`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(blog)
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}

export const list = () =>{
    return fetch(`${API}/api/blogs`,{
        method:'GET'
    }).then( response =>{
        return response.json()
    })
    .catch(console.log)
}

export const removeBlog = (slug, token) =>{
    
    return fetch(`${API}/api/blog/${slug}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
             'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
    
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}

export const updateBlog = (blog, token, slug) =>{
    
    return fetch(`${API}/api/blog/${slug}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Authorization':`Bearer ${token}`,
        },
        body:blog
    })
    .then( response => {  
        return response.json()
    })
    .catch(error => console.log(error))
}