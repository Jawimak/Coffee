import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader"
import {CoursesList} from "../components/CoursesList";

export const CoursesPage = () => {
    const [courses, setCourses] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async()=>{
        try {
            const fetched = await request('/api/course', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setCourses(fetched)
        }   catch (e) {}
    }, [token, request])

    useEffect(()=>{
        void fetchLinks()
    }, [fetchLinks])

    if(loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && <CoursesList courses = {courses} />}
        </>
    )
};