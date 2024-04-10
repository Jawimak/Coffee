import React from "react"
import {Link} from "react-router-dom"

export const CoursesList = ({courses}) => {
    if (!courses.length){
        return <p className="center"> Нет доступных курсов</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Название</th>
                <th>Дата создания</th>
                <th>Открыть</th>
            </tr>
            </thead>

            <tbody>
            {courses.map((course)=>{
                return (
                    <tr key={course._id}>
                        <td>{course.name}</td>
                        <td>{course.date}</td>
                        <td>
                            <Link to={`/course_detail/${course._id}`}>Перейти к курсу</Link>

                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
