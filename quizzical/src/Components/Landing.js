export default function Landing(props) {
    return (
        <div className="landing flex-center">
            <h1 className="title">Quizzical</h1>
            <p className="subtitle">Some description if needed</p>
            <button className="start-btn btn" onClick={props.toggleStart}>Start quiz</button>
        </div>
    )
}