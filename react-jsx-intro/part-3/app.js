const App = () => {
    return (
        <div>
            <Person name="Kieth" age={5} hobbies= {["Fishing", "Rock climbing", "Hiding from wife"]} />
            <Person name="DarwinCharles" age={198} hobbies= {["Science", "DNA analysis", "Hiding from wife"]} />
            <Person name="Danaerys" age={32} hobbies= {["Playing with dragons", "Bringing down westeros", "Scaring husband"]} />
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"))