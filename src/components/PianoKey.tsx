import { NoteState } from './constants';
import './PianoStyling.css';

interface PianoKeyProps {
    note: string,
    isBlack: boolean,
    leftOffset: number,
    onClick: (note: string) => void,
    state?: NoteState,
}

function PianoKey({note, isBlack, leftOffset, onClick, state}: PianoKeyProps) {
    return (
        <div
            className={`key ${isBlack ? 'black' : 'white'} ${state ? `${state}` : ''}`}
            style={{left: leftOffset}}
            onClick={() => onClick(note)}
        / >
    )
}

export default PianoKey;