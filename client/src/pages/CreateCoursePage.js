import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";

export const CreateCoursePage = ()=>{
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, clearError, request} = useHttp()
    const [form, setForm] = useState({
        name: '', title: '', level: ''
    })

    const [levels, setLevels] = useState([])
    const {token} = useContext(AuthContext)

    const fetchLevels = useCallback(async()=>{
        try {
            const fetched = await request('/api/level', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLevels(fetched)
        }   catch (e) {}
    }, [token, request])

    useEffect(() => {
        void fetchLevels()
        message(error)
        clearError()
    }, [error, message, clearError, fetchLevels]);


    useEffect(() => {
        window.M.updateTextFields()
    }, []);

    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const pressHandler = async() =>{
        try{
            const data = await request('/api/course/create_course', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`
            })
            navigate(`/course_detail/${data.course._id}`)
        }catch (e) {

        }
    }

    return (
        <div className="row">
            <h1>Create page</h1>
            <div className="col s8 offset-s2" style={{paddingTop: '2 rem'}}></div>
            <div className="input-field">
                <input
                    id="name"
                    type="text"
                    className="validate"
                    placeholder="Введите название курса"
                    name="name"
                    onChange={changeHandler}
                    value={form.name}
                />
                <label htmlFor="name">Название курса</label>
            </div>
            <div className="input-field">
                <input
                    id="title"
                    type="text"
                    className="validate"
                    placeholder="Введите описание курса"
                    name="title"
                    onChange={changeHandler}
                    value={form.title}
                />
                <label htmlFor="title">Описание</label>
            </div>
            <div>
                <label>Уровень курса</label>
                <select className="browser-default" value={form.level}
                        onChange={(e) => setForm({...form, level: e.target.value})}>
                    <option value="" disabled>Выберите уровень</option>
                    {levels.map((level) => (
                        <option key={level._id} value={level._id}>{level.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <button
                    className="btn yellow darken-4"
                    style={{marginRight: 10}}
                    onClick={pressHandler}
                    disabled={loading}
                >
                    Создать
                </button>

            </div>
        </div>
    )
}