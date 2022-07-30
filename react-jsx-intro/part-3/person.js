const Person = (props) => {
    return (
        <div>
            <h3> {(props.age > 18) ? "Please go Vote": "You must be 18 to vote"}</h3>
            <h3>My name is {(props.name.length > 8) ? props.name.substring(0,6): props.name} and my hobbies are:</h3>
            <ul>
                {props.hobbies.map(h => <li>{h}</li>)}
            </ul>
        </div>
    )
}