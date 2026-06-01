import PianoKey from './PianoKey';

interface PianoKeyData {
    note: string,
    isBlack: boolean,
}

function Keyboard() {
    const keys: PianoKeyData[] = [
        { note: "C", isBlack: false },
        { note: "C#", isBlack: true },
        { note: "D", isBlack: false },
        { note: "D#", isBlack: true },
        { note: "E", isBlack: false },
        { note: "F", isBlack: false },
        { note: "F#", isBlack: true },
        { note: "G", isBlack: false }, 
        { note: "G#", isBlack: true },
        { note: "A", isBlack: false},
        { note: "A#", isBlack: true },
        { note: "B", isBlack: false },
    ];

    const handleClick = (message : string) => {
        console.log(message)
    };

    return (
        <div>
            {keys.map((key) => (
                <PianoKey
                    key={key.note}
                    note={key.note} 
                    isBlack={key.isBlack} 
                    onClick={handleClick} 
                />
            ))}
        </div>
    );
}

export default Keyboard;