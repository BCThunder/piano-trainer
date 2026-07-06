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
    const [hintsEnabled, setHintsEnabled] = useState(false);
    const toggleHints = () => setHintsEnabled(h => !h);

    const scale = SCALES[scaleKey];
    const scaleNotes = buildScale({ rootNote, intervals: scale.intervals });
    const targetNotes = new Set(scaleNotes);
    const isComplete = pressedNotes.size === targetNotes.size;
    const stepSequence = scale.intervals.map(i => i === 2 ? 'W' : 'H').join(' - ');
    const nextNote = hintsEnabled
        ? scaleNotes.find(note => !pressedNotes.has(note))
        : null;

    const onNotePressed = (note: string) => {
        if (isComplete) return;
        if (targetNotes.has(note) && !pressedNotes.has(note)) {
            // Updated pressedNotes doesn't actually update until render is complete
            // so create an updated copy to use
            const newPressed = new Set(pressedNotes).add(note);
            setPressedNotes(newPressed);
            if (newPressed.size === targetNotes.size) {
                setScore((score) => score + 1);
                setFeedback('Scale complete! Press Next Exercise to continue.');
            }

            setIncorrectNote(null);
            setFeedback(`Correct! ${note.slice(0, -1)} is part of the scale.`);
        } else {
            setIncorrectNote(note);
            setFeedback(`Sorry, ${note.slice(0, -1)} is not part of that scale. Try again!`);
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
    pressedNotes.forEach(note => { noteStates[note] = 'correct' });
    if (hintsEnabled && nextNote) noteStates[nextNote] = 'target';
    if (incorrectNote) noteStates[incorrectNote] = 'incorrect';

    const prompt = `Play the ${rootNote.slice(0, -1)} ${scale.name} scale`;

    return {prompt, 
            noteStates, 
            onNotePressed, 
            isComplete, 
            score, 
            nextExercise, 
            feedback,
            hintsEnabled,
            toggleHints,
            stepSequence,
        };
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

export default useScaleExercise;
