export default function Choice(props) {
    const styleChosen = {
        background: "#D6DBF5",
        border: "0.8px solid #F5F7FB"
    }

    const styleNotChosen = {
        opacity: "0.5"
    }

    const styleCorrect = {
        background: "#94D7A2",
        border: "0.8px solid #F5F7FB"
    }

    const styleWrong = {
        background: "#F8BCBC",
        border: "0.8px solid #F5F7FB",
        opacity: "0.5"
    }

    function chooseStyle() {
        if (!props.isChecking && props.isChosen) {
            return styleChosen
        } else if (props.isChecking && !props.isChosen && !props.isCorrectChoice) {
            return styleNotChosen
        } else if (props.isChecking && props.isChosen && props.isCorrectChoice) {
            return styleCorrect
        } else if (props.isChecking && !props.isChosen && props.isCorrectChoice) {
            return styleCorrect
        } else if (props.isChecking && props.isChosen && !props.isCorrectChoice) {
            return styleWrong
        }
    }

    return (
        <div>
            <p 
                className="item-choice flex-center" 
                onClick={props.chooseAnswer}
                style={chooseStyle()}
            >
                {props.value}
            </p>
        </div>
    )
}