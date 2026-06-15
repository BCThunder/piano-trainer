import {useRef} from 'react';
import { NOTES } from "./constants";

function usePianoAudio() {
    const audioCtx = useRef<AudioContext | null>(null);

    // Note is a string of the note + octave like 'C4' or 'C#4'
    const getFrequency = (note: string): number => {
        const OCTAVE = parseInt(note.slice(-1));
        const noteIndex = NOTES.indexOf(note.slice(0, -1));
        const MIDI = (OCTAVE + 1) * 12 + noteIndex;

        return ( 440 * 2**((MIDI - 69) / 12) );
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