interface ContentInfo {
    name: string,
    exerciseCount: number
};

interface ContentProps {
    courseParts: ContentInfo[]
};

const Content = (props: ContentProps) => (
    props.courseParts.map(coursePart => 
        <p key={coursePart.name}>{coursePart.name} {coursePart.exerciseCount}</p> 
    )
);

export default Content;