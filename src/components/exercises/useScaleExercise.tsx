import { useState } from "react"
import { ALL_NOTES } from "../constants"

interface ScaleProps {
    rootNote: string,
    intervals: Array<number>,
};

const SCALES = {
    Major: { name: 'Major', intervals: [2, 2, 1, 2, 2, 2, 1] },
    Minor: { name: 'Minor', intervals: [2, 1, 2, 2, 1, 2, 2] },
}

function useScaleExercise() {

    const [rootNote, setRootNote] = useState("C4");
    const [scaleKey, setScaleKey] = useState<keyof typeof SCALES>('Major');
    const [pressedNotes, setPressedNotes] = useState<Set<string>>(new Set());
    const [incorrectNote, setIncorrectNote] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");

    const scale = SCALES[scaleKey];
    const targetNotes = new Set(buildScale({ rootNote, intervals: scale.intervals }));
    const isComplete = pressedNotes.size === targetNotes.size;

    const onNotePressed = (note: string) => {
        if (targetNotes.has(note)) {
            // Updated pressedNotes doesn't actually update until render is complete
            // so create an updated copy to use
            const newPressed = new Set(pressedNotes).add(note);
            setPressedNotes(newPressed);
            if (newPressed.size === targetNotes.size) {
                setScore((score) => score + 1);
            }

            setIncorrectNote(null);
            setFeedback(`Correct! ${note} is part of the scale.`);
        } else {
            setIncorrectNote(note);
            setFeedback(`Sorry, ${note} is not part of that scale. Try again!`);
        }
    }

    const nextExercise = () => {
        const validRoots = ALL_NOTES.slice(0, 24) // C3 to B4
        setRootNote(validRoots[Math.floor(Math.random() * validRoots.length)]);
        const scaleKeys = Object.keys(SCALES) as Array<keyof typeof SCALES>;
        setScaleKey(scaleKeys[Math.floor(Math.random() * scaleKeys.length)]);
        setPressedNotes(new Set());
        setIncorrectNote(null);
    };
    
    const noteStates: Record<string, 'correct' | 'incorrect' | 'target'> = {};
    pressedNotes.forEach(note => { noteStates[note] = 'correct'; });
    if (incorrectNote) noteStates[incorrectNote] = 'incorrect';

    const prompt = `Play the ${rootNote.slice(0, -1)} ${scale.name} scale`;

    return {prompt, noteStates, onNotePressed, isComplete, score, nextExercise, feedback};
}

function buildScale({rootNote, intervals}: ScaleProps) {
    let startIndex: number = ALL_NOTES.indexOf(rootNote);
    const scale: Array<string> = []

    scale.push(ALL_NOTES[startIndex]);
    for (let i = 0; i < intervals.length; i++) {
        startIndex += intervals[i];
        scale.push(ALL_NOTES[startIndex]);
    };

    return scale;
}

