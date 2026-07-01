import { useState } from "react";
import { NOTES } from "../constants";

function useNoteExercise() {
    const [targetNote, setTargetNote] = useState("C");
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [noteStates, setNoteStates] = useState<Record<string, 'correct' | 'incorrect' | 'target'>>({});
    
    const prompt : string = `Find ${targetNote} on the keyboard`;

    const getRandomNote = () => {
        return NOTES[Math.floor(Math.random() * NOTES.length)];
    }

    const onNotePressed = (note: string) => {
        if (note.slice(0, -1) === targetNote) {
            setScore(score => score + 1);
            setFeedback("That's the correct note!")
            setTargetNote(getRandomNote());
            setNoteStates({});
        } else {
            setFeedback("Wrong note. Try again!")
            setNoteStates({ [note]: 'incorrect' });
        }
    }

    return { prompt, noteStates, onNotePressed, score, feedback };
}

export default useNoteExercise;