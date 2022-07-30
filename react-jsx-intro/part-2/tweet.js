const Tweet = (props) => {
    return (
        <div>
            <h1>User: {props.username}</h1>
            <h4>Tweets by: {props.name}</h4>
            <p>Tweet: {props.message}</p>
            <footer>{props.date}</footer>
        </div>
    )
}