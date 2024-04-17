import React from "react"
import {Link} from "react-router-dom"

export const CoursesList = ({courses}) => {
    if (!courses.length){
        return <p className="center"> Нет доступных курсов</p>
    }

    return (
        <>
            <h1 className="center"> Список доступных курсов</h1>
            <div className="rowCard">
                {courses.map((course) => (
                    <div className="card medium column" key={course._id}>
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator"
                                 src={course.image}
                                 style={{marginTop: '-15em'}}
                            />
                        </div>

                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">{course.name}<i
                                className="material-icons right">Развернуть</i></span>
                            <Link to={`/course_detail/${course._id}`}>Перейти к курсу</Link>
                        </div>

                        <div className="card-reveal">
                            <span className="card-title grey-text text-darken-4">{course.name}<i
                                className="material-icons right">Свернуть</i></span>
                            <p>{course.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
