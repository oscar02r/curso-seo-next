import fetch from 'isomorphic-fetch'
import { API } from '../config'
import queyStrig from 'query-string'
import { isAuth, handleResponse } from '../actions/auth'

export const createBlog = (blog, token) =>{
    let createBlogEndpoint ;
    if (isAuth() && isAuth().role === 1) {
        createBlogEndpoint = `${API}/api/blog`
    }else if(isAuth() && isAuth().role === 0){
      createBlogEndpoint = `${API}/api/user/blog`
    }
    return fetch(`${createBlogEndpoint}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Authorization':`Bearer ${token}`,
        },
        body:blog
    })
    .then( response => {  
        handleResponse(response)
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

export const list = (username) =>{

    let listBlogsEndpoint ;
    if (username) {
        listBlogsEndpoint = `${API}/api/${username}/blogs`
    }else {
      listBlogsEndpoint = `${API}/api/blogs`
    }
    return fetch(`${listBlogsEndpoint}`,{
        method:'GET'
    }).then( response =>{
        return response.json()
    })
    .catch(console.log)
}

export const removeBlog = (slug, token) =>{
    let deleteBlogEndpoint ;
    if (isAuth() && isAuth().role === 1) {
        deleteBlogEndpoint = `${API}/api/blog/${slug}`
    }else if(isAuth() && isAuth().role === 0){
      deleteBlogEndpoint = `${API}/api/user/blog/${slug}`
    }

    return fetch(`${deleteBlogEndpoint}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
             'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
        },
    
    })
    .then( response => {  
        handleResponse(response)
        return response.json()
    })
    .catch(error => console.log(error))
}

export const updateBlog = (blog, token, slug) =>{
    let updateBlogEndpoint ;
if (isAuth() && isAuth().role === 1) {
    updateBlogEndpoint = `${API}/api/blog/${slug}`
}else if(isAuth() && isAuth().role === 0){
  updateBlogEndpoint = `${API}/api/user/blog/${slug}`
}
    return fetch(`${updateBlogEndpoint}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Authorization':`Bearer ${token}`,
        },
        body:blog
    })
    .then( response => {  
        handleResponse(response)
        return response.json()
    })
    .catch(error => console.log(error))
}

export const listSearch = (params) =>{
    let query = queyStrig.stringify(params)

    return fetch(`${API}/api/blogs/search?${query}`,{
        method:'GET'
    }).then( response =>{
        return response.json()
    })
    .catch(console.log)
}