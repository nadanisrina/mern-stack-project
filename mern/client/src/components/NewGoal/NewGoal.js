import React from "react"
import "./NewGoal.css"
const NewGoal = (props) => {
    const addGoalHandler = (e) => {
        e.preventDefault();
        const newGoal = {
            id: Math.random().toString(),
            text: "My New Goal"
        }
        props.onAddGoal(newGoal)
        console.log("newGoal", newGoal)
    }
    return(
       <form className="new-goal" onSubmit={addGoalHandler}>
           <input type="text" name="goal"/>
           <button type="submit">Add Goal</button>
        </form>
    )
}

export default NewGoal