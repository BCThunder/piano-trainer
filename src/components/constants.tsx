export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const ALL_NOTES = [3, 4, 5].flatMap(octave => 
    NOTES.map(note => 
        note + octave
    )
)

export const WHITE_KEY_WIDTH = 40;

export const BLACK_KEY_WIDTH = 24;

export const SPARKLE_WIDTH = 10;    // hardcoded value in Keyboard.css

// The visual state a piano key can be in; each value is also a CSS class
// in PianoKey.css.
export type NoteState = 'correct' | 'incorrect' | 'target';
