import React, {useEffect, useState} from "react"

export const TagContext = React.createContext()

export const TagProvider = (props) => {

    const [tags, setTags] = useState([])

    const getTags = () => {
        return fetch("http://localhost:8000/tags")
        .then(res => res.json())
        .then(setTags)
    }

    const addTag = (tag) =>{
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
        .then(getTags)
    
    }

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {

    }, [tags])

    return (
        <TagContext.Provider value={{
            tags, getTags, addTag
        }}>
            {props.children}
        </TagContext.Provider>
    )
}
