import Keyboard from "../Keyboard";
import useScaleExercise from "./useScaleExercise";

function ScaleExercise() {
    const {prompt, 
            noteStates, 
            onNotePressed, 
            isComplete, 
            score, 
            nextExercise, 
            feedback,
            hintsEnabled,
            toggleHints,
            stepSequence,
            } = useScaleExercise();

    return (
        <div className="exercise-container">
            <h1>Mark the Scale on the Keyboard</h1>
            <h3>{prompt}</h3>
            <Keyboard onClick={onNotePressed} noteStates={noteStates} />
            <p>
                Hint: The major and minor scales can be built by picking a root note 
                and completing a series of whole steps (two notes apart) and half 
                steps (one note apart) ascending up in notes!
            </p>
            
            <p>
                <button onClick={toggleHints}>Hint</button>
                { hintsEnabled && 
                    `Whole/Half Step Sequence: ${stepSequence}`
                }
            </p>
            
            <h3>{feedback}</h3>
            
            {isComplete && 
                <button onClick={nextExercise}>Next Exercise</button>
            }

            <h3> Score: {score} </h3>
            
        </div>
    )
}

export default ScaleExercise;