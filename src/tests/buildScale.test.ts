import { buildScale } from "../components/exercises/useScaleExercise";

test('C4 Major Scale', () => {
    const result = buildScale({rootNote: 'C4', intervals: [2, 2, 1, 2, 2, 2, 1]});
    expect(result).toEqual(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'])
});

test('A3 Minor Scale', () => {
    const result = buildScale({rootNote: 'A3', intervals: [2, 1, 2, 2, 1, 2, 2]});
    expect(result).toEqual(['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4']);
});

test('F#3 Major Scale', () => {
    const result = buildScale({rootNote: 'F#3', intervals: [2, 2, 1, 2, 2, 2, 1]});
    // Replaced E#4 with F4 to handle enharmonic note
    expect(result).toEqual(['F#3', 'G#3', 'A#3', 'B3', 'C#4', 'D#4', 'F4', 'F#4']);
});