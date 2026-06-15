import { useEffect, useState } from 'react';
import Keyboard from "../Keyboard";
import { NOTES } from "../constants";

function NoteExercise() {
    const [targetNote, setTargetNote] = useState("C");
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");    

    const getRandomNote = () => {
        return NOTES[Math.floor(Math.random() * NOTES.length)];
    }

    useEffect(() => {
        setTargetNote(getRandomNote());
    }, []);

    const handleGuess = (note: string) => {
        if (targetNote === note) {
            setScore(score => score + 1);
            setFeedback("That is correct!");
            setTargetNote(getRandomNote());
        } else {
            setFeedback(`Unfortunately, that's incorrect. Try again!`);
        }
    };

    return (
        <div>
            <header>Find the Note on the Piano!</header>
            Where is {targetNote} on the piano?
            <Keyboard 
                onClick={handleGuess}
            />
            <div>
                {feedback} Score: {score}
            </div>
        </div>
        
    )
}

export default NoteExercise;