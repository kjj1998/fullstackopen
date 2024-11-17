import { CoursePart } from "../App";

interface PartProps {
    coursePart: CoursePart
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = (props: PartProps) => {
    const { coursePart } = props;
    switch (coursePart.kind) {
        case "basic": {
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
                    <i>{coursePart.description}</i>
                </p>
            );
        }
        case "group": {
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
                    <i>project exercises {coursePart.groupProjectCount}</i>
                </p>
            );
        }
        case "background": {
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
                    <i>{coursePart.description}</i><br />
                    background material: {coursePart.backgroundMaterial}
                </p>
            );
        }
        default:
            return assertNever(coursePart);
    }
};

export default Part;