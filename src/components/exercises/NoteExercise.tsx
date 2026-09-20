import Keyboard from "../Keyboard";
import ExerciseLayout from "./ExerciseLayout";
import useNoteExercise from './useNoteExercise';

function NoteExercise() {
    const { prompt, noteStates, onNotePressed, score, feedback } = useNoteExercise();

    return (
        <ExerciseLayout
            title="Find the Note on the Piano!"
            keyboard={
                <Keyboard
                    onClick={onNotePressed}
                    noteStates={noteStates}
                />
            }
            info={
                <>
                    <h3>{prompt}</h3>
                    <p className="exercise-feedback">{feedback}</p>
                    <p className="exercise-score">Score: {score}</p>
                </>
            }
        />
    )
}

export default NoteExercise;
