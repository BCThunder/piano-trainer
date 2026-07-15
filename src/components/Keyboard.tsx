import PianoKey from './PianoKey';
import usePianoAudio from './usePianoAudio';
import { 
    NOTES, 
    WHITE_KEY_WIDTH, 
    BLACK_KEY_WIDTH, 
    SPARKLE_WIDTH 
} from "./constants";
import { useState, useRef } from "react";
import "./PianoStyling.css";

interface OctaveKeyTemplate {
    noteIndex: number,
    isBlack: boolean,
    octaveOffset: number,
}

interface PianoKeyData {
    note: string,
    isBlack: boolean,
    leftOffset: number,
}

interface KeyboardProps {
    onClick?: (note: string) => void;
    noteStates?: Record<string, 'correct' | 'incorrect' | 'target'>;
}

interface MidiSparkle {
    id: number,
    x: number,
}


function Keyboard({ onClick, noteStates }: KeyboardProps) {
    const { playNote } = usePianoAudio();

    const octaveKeys: OctaveKeyTemplate[] = [
        // The white keys are 40px wide so should be 40px away from each other
        // The black keys are 20px wide so should be 28px from the left of 
        // white key to its left
        { noteIndex: 0, isBlack: false, octaveOffset: 0 },
        { noteIndex: 1, isBlack: true, octaveOffset: 28 },
        { noteIndex: 2, isBlack: false, octaveOffset: 40 },
        { noteIndex: 3, isBlack: true, octaveOffset: 68},
        { noteIndex: 4, isBlack: false, octaveOffset: 80 },
        { noteIndex: 5, isBlack: false, octaveOffset: 120 },
        { noteIndex: 6, isBlack: true, octaveOffset: 148 },
        { noteIndex: 7, isBlack: false, octaveOffset: 160 }, 
        { noteIndex: 8, isBlack: true, octaveOffset: 188 },
        { noteIndex: 9, isBlack: false, octaveOffset: 200 },
        { noteIndex: 10, isBlack: true, octaveOffset: 228 },
        { noteIndex: 11, isBlack: false, octaveOffset: 240 },
    ];

    const keys: PianoKeyData[] = [3, 4, 5].flatMap((octave, octaveIndex) => 
        octaveKeys.map(template => (
            {
                note: NOTES[template.noteIndex] + octave,
                isBlack: template.isBlack,
                leftOffset: template.octaveOffset + octaveIndex * 280,
            }
        ))
    );

    const [midiSparkles, setMidiSparkles] = useState<MidiSparkle[]>([]);
    const nextSparkleId = useRef(0);

    const handleSparkleAnimationEnd = (id: number) => {
        setMidiSparkles(prev => prev.filter(sparkle => sparkle.id !== id));
    };

    const handleClick = (note : string) => {
        playNote(note);
        onClick?.(note);

        // Get the currently pressed key's data to create the midi sparkle
        const pressedKey = keys.find(k => k.note === note);
        if (!pressedKey) { return ; }
        const keyWidth: number = pressedKey.isBlack ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH; 
        const leftOffset: number = pressedKey.leftOffset;

        const newSparkle: MidiSparkle = { 
            id: nextSparkleId.current++, 
            x: leftOffset + (keyWidth / 2) - (SPARKLE_WIDTH / 2),
        };
        setMidiSparkles(prev => [...prev, newSparkle]);
    };

    return (
        <div className="keyboard-scroll-container">
            <div className="midi-visualizer-container">
                {midiSparkles.map((sparkle) => (
                    <div 
                        className="midi-sparkle" 
                        key={sparkle.id}
                        style={{left: sparkle.x}}
                        onAnimationEnd={() => handleSparkleAnimationEnd(sparkle.id)}
                    />
                ))}
            </div>

            <div
            className="keyboard"
            >
                {keys.map((key) => (
                    <PianoKey
                        key={key.note}
                        state={noteStates?.[key.note]}
                        note={key.note} 
                        isBlack={key.isBlack}
                        leftOffset={key.leftOffset}
                        onClick={handleClick}
                    />
                ))}
                
            </div>
        </div>
        
    );
}

export default Keyboard;