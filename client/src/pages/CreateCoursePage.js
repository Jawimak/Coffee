import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';

export const CreateCoursePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, clearError, request } = useHttp();
    const [form, setForm] = useState({
        name: '', title: '', role: '', questions: []
    });
    const [roles, setRoles] = useState([]);
    const { token } = useContext(AuthContext);

    const fetchRoles = useCallback(async () => {
        try {
            const fetched = await request('/api/role/get', 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setRoles(fetched);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        void fetchRoles();
        message(error);
        clearError();
    }, [error, message, clearError, fetchRoles]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const addQuestion = () => {
        setForm(prevForm => ({
            ...prevForm,
            questions: [...prevForm.questions, {name: '', ans: [], cor: '' }]
        }));
    };

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const questionChangeHandler = (index, event) => {
        const updatedQuestions = [...form.questions];
        if (event.target.name === 'ans') {
            const answers = event.target.value.split(',').map(answer => answer.trim());
            updatedQuestions[index][event.target.name] = answers;
        } else {
            updatedQuestions[index][event.target.name] = event.target.value;
        }
        setForm({ ...form, questions: updatedQuestions });
    };

    const pressHandler = async () => {
        try {
            const data = await request('/api/course/create_course', 'POST', { ...form }, {
                Authorization: `Bearer ${auth.token}`
            });
            navigate(`/course_detail/${data.course._id}`);
        } catch (e) {}
    };

    return (
        <div className="row">
            <h1>Создание курса</h1>
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}></div>
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
                <select className="browser-default" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="" disabled>Выберите уровень</option>
                    {roles.map((role) => (
                        <option key={role._id} value={role._id}>{role.name}</option>
                    ))}
                </select>

            {form.questions.map((question, index) => (
                <div key={index}>
                    <h4>Вопрос:</h4>
                    <input
                        type="text"
                        placeholder="Введите вопрос"
                        name="name"
                        value={question.name}
                        onChange={(e) => questionChangeHandler(index, e)}
                    />
                    <input
                        type="text"
                        placeholder="Возможные ответы"
                        name="ans"
                        value={question.ans}
                        onChange={(e) => questionChangeHandler(index, e)}
                    />
                    <input
                        type="text"
                        placeholder="Правильный ответ"
                        name="cor"
                        value={question.cor}
                        onChange={(e) => questionChangeHandler(index, e)}
                    />
                </div>
            ))}
            <button
                className="btn yellow darken-3"
                style={{ margin: 10 }}
                onClick={addQuestion}
                disabled={loading}
            >
                Добавить вопрос
            </button>
            <div>
                <button
                    className="btn yellow darken-4"
                    style={{ margin: 10, alignSelf: 'flex-end' }}
                    onClick={pressHandler}
                    disabled={loading}
                >
                    Создать
                </button>
            </div>
        </div>
        </div>
    );
};