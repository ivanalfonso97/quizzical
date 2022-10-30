import React from "react"
import {nanoid} from "nanoid"
import Question from "./Question"

export default function Quiz() {
    const [quizData, setQuizData] = React.useState([])
    const [questions, setQuestions] = React.useState([])
    const [isChecking, setIsChecking] = React.useState(false)
    const [score, setScore] = React.useState(0)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5") //make this a variable
            .then(res => res.json())
            .then(data => setQuizData(data.results))
    }, [])

    React.useEffect(() => {
        setQuestions(createQuestions())
    }, [quizData])

    React.useEffect(() => {
        setScore(countCorrectAnswers())
    }, [questions])

    function createQuestions() {
        const questionArray = []
        quizData.map(item => {
            questionArray.push(
                {
                    id: nanoid(),
                    question: decodeHtml(item.question),
                    correct_answer: item.correct_answer,
                    incorrect_answer: item.incorrect_answers,
                    isCorrect: false
                }
            )
        })
        return questionArray
    }

    function decodeHtml(html) {
        let text = document.createElement('textarea')
        text.innerHTML = html
        return text.value
    }

    function startCheck() {
        setIsChecking(true)
    }

    function playAgain() {
        setIsChecking(false)
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => setQuizData(data.results))
    }

    function toggleCorrect(id) {
        setQuestions(prevState => prevState.map(question => {
            return question.id === id ? {...question, isCorrect: !question.isCorrect} : question
        }))
    }

    function countCorrectAnswers() {
        let score = 0
        questions.map(question => {
            if (question.isCorrect) {
                score += 1
            }
        })
        return score
    }

    const questionsElement = questions.map(question => {
        return (
            <Question 
                key={question.id}
                {...question}
                isChecking={isChecking}
                toggleCorrect={() => toggleCorrect(question.id)}
                decodeHtml={decodeHtml}
            />
        )
    })
    
    return (
        <div className="quiz flex-center">
            <div>
                {questionsElement}
            </div>
            <div className="cta-container flex-center">
                {isChecking && <p className="score">You scored {score}/5 correct answers</p>}
                <button 
                    className="quiz-btn btn"
                    onClick={isChecking ? playAgain : startCheck}
                >
                    {isChecking ? "Play again" : "Check answers"}
                </button>
            </div>
        </div>
    ) 
}