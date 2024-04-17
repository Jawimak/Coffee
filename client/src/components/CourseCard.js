import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const CourseCard = ({ course, question }) => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [correctAnswerPercentage, setCorrectAnswerPercentage] = useState(0);
    const [progressVisibility, setProgressVisibility] = useState('hidden');
    const [answers, setAnswers] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState(0)

    useEffect(() => {
        const M = window.M;
        const el = document.querySelectorAll('.tabs');
        const instance = M.Tabs.init(el, {});
    }, []);

    const handleChange = (questionID, answerID, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionID]: { answerID, answer }
        }));
    };

    const submitHandler = async () => {
        try {
            if (Object.keys(answers).length < question.length) {
                alert("Answer all questions!");
                return;
            }

            let correct = question.reduce((total, quest) => (
                answers[quest._id] && answers[quest._id].answer === quest.cor ? total + 1 : total
            ), 0);

            setCorrectAnswers(correct)

            setButtonDisabled(true);
            const percentage = (correct / question.length) * 100;
            setCorrectAnswerPercentage(percentage);
            setProgressVisibility('visible');

            const data = await request('/api/mark/create', 'POST', { val: percentage, courseId: course.id }, {
                Authorization: `Bearer ${token}`
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <h2>{course.name}</h2>
            <h4>Описание: <strong>{course.title}</strong></h4>
            <h5>Дата создания: <strong>{new Date(course.date).toLocaleDateString()}</strong></h5>

            <ul className="tabs tabs-fixed-width tab-demo z-depth-1">
                <li className="tab"><a className="active" href="#theory">Теория</a></li>
                <li className="tab"><a href="#practice">Тест</a></li>
            </ul>
            <div id="theory" className="col s12">
                <p>Theory</p>
                </div>
            <div id="practice" className="row">
                {question.map((quest) => (
                    <div className="card" style={{flexGrow: 1, position: 'relative', paddingBottom: 10}} key={quest._id}>
                        <h3 className="center">{quest.name}</h3>
                        <form action="#">
                            {quest.ans.map((answer, answerIndex)=> (
                                <p key={answerIndex}>
                                    <label>
                                        <input className="with-gap" name={quest._id} type="radio" disabled={buttonDisabled} onChange={() => handleChange(quest._id, answerIndex, answer)}/>
                                        <span>{answer}</span>
                                    </label>
                                </p>
                            ))}
                        </form>
                    </div>
                ))}
                <button
                    className="btn green darken-1 black-text"
                    onClick={submitHandler}
                    disabled={loading || buttonDisabled}
                >
                    Отправить
                </button>

                <div className="progress" style={{visibility: `${progressVisibility}`}}>
                    <div className="determinate" style={{width: `${correctAnswerPercentage}%`}}></div>
                </div>
                <div style={{visibility: `${progressVisibility}`}}>
                    <h4>Правильных ответов: <strong>{correctAnswers}</strong> из <strong>{question.length}</strong></h4>
                </div>
            </div>


        </>
    )
}