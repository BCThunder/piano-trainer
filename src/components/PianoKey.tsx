interface PianoKeyProps {
    note: string,
    isBlack: boolean,
    onClick: (note: string) => void,
}

function PianoKey({note, isBlack, onClick}: PianoKeyProps) {
    return (
        <div 
            style={{color: isBlack ? 'Black' : 'White'}}
            onClick={() => onClick(note)}
        >
            {note}
        </div>
    )
}

export default PianoKey;