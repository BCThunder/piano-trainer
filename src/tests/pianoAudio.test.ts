import { getFrequency } from "../components/usePianoAudio";

test('A4 Piano Audio', () => {
    const result = getFrequency('A4');
    expect(result).toEqual(440);
});

test('C4 Piano Audio', () => {
    const result = getFrequency('C4');
    expect(result).toBeCloseTo(261.63, 2);
});