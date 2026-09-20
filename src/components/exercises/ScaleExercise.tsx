import Keyboard from "../Keyboard";
import ExerciseLayout from "./ExerciseLayout";
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
        <ExerciseLayout
            title="Mark the Scale on the Keyboard"
            keyboard={
                <Keyboard onClick={onNotePressed} noteStates={noteStates} />
            }
            info={
                <>
                    <h3>{prompt}</h3>

                    <p className="exercise-hint">
                        Hint: The major and minor scales can be built by picking a root note 
                        and completing a series of whole steps (two notes apart) and half 
                        steps (one note apart) ascending up in notes!
                    </p>

                    <button onClick={toggleHints}>Hint</button>

                    { hintsEnabled &&
                        <p className="exercise-hint">
                            {`Whole/Half Step Sequence: ${stepSequence}`}
                        </p>
                    }

                    <p className="exercise-feedback">{feedback}</p>

                    {isComplete && 
                        <button onClick={nextExercise}>Next Exercise</button>
                    }

                    <p className="exercise-score">Score: {score}</p>
                </>
            }
        />
    )
}

export default ScaleExercise;
