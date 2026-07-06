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
        <div>
            {prompt}
            <Keyboard onClick={onNotePressed} noteStates={noteStates} />
            Hint: The major and minor scales can be built by picking a root note 
            and completing a series of whole steps (two notes apart) and half 
            steps (one note apart) ascending up in notes! <br />
            
            { hintsEnabled && 
                'Major: W, W, H, W, W, W, H Minor: W, H, W, W, H, W, W'
            }
            <br />
            <button onClick={toggleHints}>Hint</button>
            
            {feedback} <br />
            {isComplete && 
                <button onClick={nextExercise}>Next Exercise</button>
            }
            <br />
            Score: {score} 
        </div>
    )
}

export default ScaleExercise;