import Keyboard from "../Keyboard";
import useNoteExercise from './useNoteExercise';

function NoteExercise() {
    const { prompt, noteStates, onNotePressed, score, feedback } = useNoteExercise();

    return (
        <div className='exercise-container'>
            <h1>Find the Note on the Piano!</h1>
            <h3>{prompt}</h3>
            <Keyboard 
                onClick={onNotePressed}
                noteStates={noteStates}
            />
            <div>
                {feedback}
                Score: {score}
            </div>
        </div>
        
    )
}

export default NoteExercise;