import './PianoStyling.css';

interface PianoKeyProps {
    note: string,
    isBlack: boolean,
    leftOffset: number,
    onClick: (note: string) => void,
}

function PianoKey({note, isBlack, leftOffset, onClick}: PianoKeyProps) {
    return (
        <div
            className={`key ${isBlack ? 'black' : 'white'}`}
            style={{left: leftOffset}}
            onClick={() => onClick(note)}
        / >
    )
}

export default PianoKey;