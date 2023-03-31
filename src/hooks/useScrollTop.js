import { useEffect } from "react"

export const useScrollTop = (dependencylist = []) =>{
    useEffect(()=>{
        window.scroll({
            top : 0,
            behavior :'smooth'
        })
    },dependencylist)
}