import PianoKey from './PianoKey';
import usePianoAudio from './usePianoAudio';
import { NOTES } from "./constants";
import "./PianoStyling.css";

interface PianoKeyData {
    note: string,
    isBlack: boolean,
    leftOffset: number,
}

interface KeyboardProps {
    onClick?: (note: string) => void;
}

function Keyboard({ onClick }: KeyboardProps) {
    const { playNote } = usePianoAudio();

    const keys: PianoKeyData[] = [
        { note: NOTES[0], isBlack: false, leftOffset: 0 },
        { note: NOTES[1], isBlack: true, leftOffset: 0.7 * 40 },
        { note: NOTES[2], isBlack: false, leftOffset: 40 },
        { note: NOTES[3], isBlack: true, leftOffset: 0.7 * 40 + 40},
        { note: NOTES[4], isBlack: false, leftOffset: 80  },
        { note: NOTES[5], isBlack: false, leftOffset: 120  },
        { note: NOTES[6], isBlack: true, leftOffset: 0.7 * 40 + 120},
        { note: NOTES[7], isBlack: false, leftOffset: 160  }, 
        { note: NOTES[8], isBlack: true, leftOffset: 0.7 * 40 + 160},
        { note: NOTES[9], isBlack: false, leftOffset: 200 },
        { note: NOTES[10], isBlack: true, leftOffset: 0.7 * 40 + 200},
        { note: NOTES[11], isBlack: false, leftOffset: 240  },
    ];

    const handleClick = (note : string) => {
        playNote(note);
        onClick?.(note);
    };

    return (
        <div
            className="keyboard"
        >
            {keys.map((key) => (
                <PianoKey
                    key={key.note}
                    note={key.note} 
                    isBlack={key.isBlack}
                    leftOffset={key.leftOffset}
                    onClick={handleClick}
                />
            ))}
        </div>
    );
}

export default Keyboard;