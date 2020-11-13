import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PostContext } from "./PostProvider" 
import {CategoryContext} from "../categories/CategoriesProvider"
import {PostTagContext, postTags} from "../tags/PostTagProvider"
import {TagContext} from "../tags/TagProvider"
// import {users} from "../auth/AuthProvider"
import "./PostDetail.css"
import { makeStyles } from '@material-ui/core/styles';
// import { PostTagContext } from "../tags/PostTagProvider"

export const PostDetails = (props) => {
    const { singlePost, getSinglePost, deletePost } = useContext(PostContext)
    const { categories, getAllCategories} = useContext(CategoryContext)
    const { tags, getTags} = useContext(TagContext)
    // const { profile, getProfile } = useContext(ProfileContext)
    const {postTags, getAllPostTags} = useContext(PostTagContext)
    // const {postTags, getPostTags} = useContext(PostTagContext)
    var pathArray = window.location.pathname.split('/')
    let postNumber = parseInt(pathArray[2])



    useEffect(() => {
        getSinglePost(postNumber)
        .then(getAllCategories())
        .then(getAllPostTags())
        
    }, [])

    const delete_prompt = (id) => {
        var retVal = window.confirm("This action will permanently delete the post. Are you sure?");
        if( retVal == true ) {
            deletePost(id)
            props.history.push("/posts")
            return true;
        } else {
            return false;
        }
    }

    const useStyles = makeStyles((theme) => ({
            root: {
            '& > *': {
                margin: theme.spacing(1),
                color: "#EB5757",  
                position: "fixed",
                display: "flex",
                bottom: 0,
                background: "black",
                margin: 0
            },
            },
            primary: {
            '& > *': {
                color: "black"
            },
        },
    }));

    const singlePostUser = singlePost.rare_user 
    const singlePostPubDate = singlePost.publication_date || ""
    const splitPubDate = singlePostPubDate.split('-')
    const correctPubDate = `${splitPubDate[1]}/${splitPubDate[2]}/${splitPubDate[0]} `
    console.log(correctPubDate)
    // console.log(singlePost.publication_date)
    const classes = useStyles()
    const category = categories.find(c => c.id === singlePost.category_id) || {}
    if (singlePost.IsAuthor){

        return (
            <>
            <div>
                <article className="postDetailsContainer">
                    <article className="postDetails">
                        <div>{singlePost.date}</div>
                        <section className="postContent">
                            <div className="postDetailsTitle">{singlePost.title}</div>
                            <div className="postDetailsContent">{singlePost.content}</div>
                            <div className="postDetailsPubDate">{correctPubDate}</div>
                            <div className="postDetailsPubDate">{                                
                                    postTags.map(t =>{
                                        return <p>{t.tag.label}</p>
                                    })}</div>
                        </section>
                        <section className="contentTags">
                            <Link className="category-list-link" to={{pathname:"/categories"}}> {category.label}</Link>
                        </section>
                            <button onClick={() => {
                                props.history.push(`/posts/${singlePost.id}`)
                                window.location.reload()}}>
                                    Edit
                            </button>
                            <button className="btn postDetails__delete_btn" onClick={() => delete_prompt(singlePost.id)}>Delete</button>
                    </article>
                </article>
            </div>
            </>
        )
    }
    else{
    return(
        <>
        <div>
            <article className="postDetailsContainer">
                <article className="postDetails">
                    <div>{singlePost.date}</div>
                    <section className="postContent">
                        <div className="postDetailsTitle">{singlePost.title}</div>
                        <div className="postDetailsContent">{singlePost.content}</div>
                        <div className="PostDetailsAuthor">Author: {singlePost.rare_user.user.first_name} {singlePost.rare_user.user.last_name}</div>
                        <div className="postDetailsPubDate">{correctPubDate}</div>
                        <div className="postDetailsPubDate">{                                
                                    postTags.map(t =>{
                                        return <p>{t.tag.label}</p>
                                    })}</div>
                        <button className="btn btn-primary" onClick={() => props.history.push(`/managetags/${postNumber}`)}>Manage Tags</button>
                    </section>
                    <section className="contentTags">
                        <Link className="category-list-link" to={{pathname:"/categories"}}> {category.label}</Link>
                    </section>
                </article>
            </article>
        </div>
    </>
    )}
}

export default PostDetails