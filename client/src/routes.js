import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import { Navigate } from "react-router-dom";
import {CreateCoursePage} from "./pages/CreateCoursePage";
import {CoursesPage} from "./pages/CoursesPage";
import {CourseDetailPage} from "./pages/CourseDetailPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/create_course" element={<CreateCoursePage/>}/>
                <Route path="/courses" element={<CoursesPage/>}/>
                <Route path="/course_detail/:id" element={<CourseDetailPage/>}/>
                <Route path="/" element={<Navigate to="/courses" replace/>}/>
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
};