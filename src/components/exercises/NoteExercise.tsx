import { useEffect, useState } from 'react';
import Keyboard from "../Keyboard";
import { NOTES } from "../constants";
import useNoteExercise from './useNoteExercise';

function NoteExercise() {
    const { prompt, noteStates, onNotePressed, score, feedback } = useNoteExercise();

    return (
        <div>
            <header>Find the Note on the Piano!</header> <br />
            {prompt}
            <Keyboard 
                onClick={onNotePressed}
                noteStates={noteStates}
            />
            <div>
                {feedback} <br />
                Score: {score}
            </div>
        </div>
        
    )
}

export default NoteExercise;