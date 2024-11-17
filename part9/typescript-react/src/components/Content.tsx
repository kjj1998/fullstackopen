import Part from "./Part";

import { CoursePart } from "../App";

interface ContentProps {
    courseParts: CoursePart[]
};

const Content = (props: ContentProps) => (
    props.courseParts.map(coursePart => 
        <Part key={coursePart.name} coursePart={coursePart} />
    )
);

export default Content;