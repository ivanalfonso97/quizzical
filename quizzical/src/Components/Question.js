import React from "react"
import {nanoid} from "nanoid"
import Choice  from "./Choice"

export default function Question(props) {
    const choices = [...props.incorrect_answer]
    const randomNumber = Math.floor(Math.random() * choices.length)
    choices.splice(randomNumber, 0, props.correct_answer)

    const [choiceObjects, setChoiceObjects] = React.useState(generateChoices())

    React.useEffect(() => {
        if (props.isChecking) {
            checkIfCorrect()
        }
    }, [props.isChecking])

    function generateChoices() {
        const choiceArray = []
        choices.map(choice => {
            let correctAnswer = false
            choice === props.correct_answer ? correctAnswer = true : correctAnswer = false
            choiceArray.push(
                {
                    id: nanoid(),
                    value: props.decodeHtml(choice),
                    isCorrectChoice: correctAnswer,
                    isChosen: false,
                }
            )
        })
        return choiceArray
    }

    function chooseAnswer(id) {
        setChoiceObjects(prevState => prevState.map(choice => {
            return choice.id === id ? {...choice, isChosen: true} : {...choice, isChosen: false}
        }))
    }

    function checkIfCorrect() {
        choiceObjects.map(choice => {
            if (choice.isCorrectChoice && choice.isChosen) {
                props.toggleCorrect()
            }
        })
    }
    
    const choicesElement = choiceObjects.map(choice => {
        return (
            <Choice
                key={choice.id}
                {...choice}
                chooseAnswer={() => chooseAnswer(choice.id)}
                isChecking={props.isChecking}
            />
        )
    })

    return (
        <div className="quiz-item">
            <p className="item-question bold">{props.question}</p>
            <div className="item-choices">
                {choicesElement}
            </div>
        </div>
    )
}