export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const ALL_NOTES = [3, 4, 5].flatMap(octave => 
    NOTES.map(note => 
        note + octave
    )
)