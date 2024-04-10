import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHref, useParams} from "react-router-dom"
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext"
import {CourseCard} from "../components/CourseCard"

function Loader() {
    return null;
}

export const CourseDetailPage = ()=>{
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [course, setCourse] = useState(null)
    const courseId = useParams().id

    const getCourse = useCallback(async () => {
        try{
            const fetched = await request(`/api/course/${courseId}`, 'GET', null, {
                Authorization: `Bearer ${token}`

            })
            setCourse(fetched)
        }catch (e) {

        }
    }, [token, courseId, request])

    useEffect(() => {
        getCourse()
    }, [getCourse])

    if(loading){
        return <Loader />
    }

    return (
        <>
            {!loading &&  course && <CourseCard course={course}/>}
        </>
    )
}