import {useRef} from 'react';

function usePianoAudio() {
    const audioCtx = useRef<AudioContext | null>(null);

    const getFrequency = (note: string): number => {
        const MIDI: Record<string, number> = {
            "C": 60, "C#": 61, 
            "D": 62, "D#": 63,
            "E": 64,
            "F": 65, "F#": 66,
            "G": 67, "G#": 68,
            "A": 69, "A#": 70,
            "B": 71,
        }

        return ( 440 * 2**((MIDI[note] - 69) / 12) );
    }

    const playNote = (note: string) => {
        if (!audioCtx.current) {
            audioCtx.current = new AudioContext();
        }
        const oscillator = audioCtx.current.createOscillator();
        const gainNode = audioCtx.current.createGain();

        oscillator.type = "triangle";

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.current.destination);

        gainNode.gain.setValueAtTime(1, audioCtx.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 1.5);

        oscillator.frequency.value = getFrequency(note);
        oscillator.start();
        oscillator.stop(audioCtx.current.currentTime + 1.5); // how long should the note play?
    }

    return {playNote};
}


export default usePianoAudio;