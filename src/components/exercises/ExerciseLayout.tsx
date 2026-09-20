import { ReactNode } from "react";
import "./ExerciseLayout.css";

interface ExerciseLayoutProps {
    title: string,
    keyboard: ReactNode,
    info: ReactNode,
}

// Presentational shell shared by every exercise: a full-width title above a
// wide piano panel and a narrow info panel. The `keyboard` and `info` slots are
// rendered JSX passed in by the caller, so this component stays unaware of any
// exercise state.
function ExerciseLayout({ title, keyboard, info }: ExerciseLayoutProps) {
    return (
        <div className="exercise-layout">
            <h1 className="exercise-title">{title}</h1>

            <div className="exercise-panels">
                <section className="panel panel--piano">
                    {keyboard}
                </section>

                <aside className="panel panel--info">
                    {info}
                </aside>
            </div>
        </div>
    )
}

export default ExerciseLayout;
