const App = () => {
    return (
        <div>
            <Tweet username="bokbok5" name="Nearly Headless Chicken" message="If someone asks me how I became nearly headless I am going to be mad" date="October 5, 2021"/>
            <Tweet username="tuktuk3" name="Rickshaw driver" message="I am not afraid of Uber" date="November 5, 2021"/>
            <Tweet username="justinbeibs" name="Biebs Biebs" message="Sorry Sorry" date="December 5, 2021"/>
        </div>
    )
}
ReactDOM.render(<App/>, document.getElementById("root"))