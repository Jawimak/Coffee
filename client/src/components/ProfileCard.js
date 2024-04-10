import React from "react"

export const ProfileCard = ({profile}) =>{
    return (
        <>
            <h2>Course</h2>
            <p>Course name: <strong>{course.name}</strong></p>
            <p>Course title: <strong>{course.title}</strong></p>
            <p>Creation date: <strong>{new Date(course.date).toLocaleDateString()}</strong></p>
        </>
    )
}