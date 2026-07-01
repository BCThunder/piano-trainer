import Keyboard from "../Keyboard";
import useScaleExercise from "./useScaleExercise";

function ScaleExercise() {
    const {prompt, noteStates, onNotePressed, isComplete, score, nextExercise, feedback} = useScaleExercise();

    return (
        <div>
            {prompt}
            <Keyboard onClick={onNotePressed} noteStates={noteStates} />
            {feedback} <br />
            {isComplete && 
                <button onClick={nextExercise}>Next Exercise</button>
            }
            <br />
            {score} 
        </div>
    )
}

export default ScaleExercise;