import { renderHook } from "@testing-library/react"
import useScaleExercise from "../components/exercises/useScaleExercise"

test('hints are off by default, so nothing is marked target', () => {
    const { result } = renderHook(() => useScaleExercise());

    expect(result.current.hintsEnabled).toEqual(false);
    expect(Object.values(result.current.noteStates).every(
        status => status !== 'target')).toBe(true);
});