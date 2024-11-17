interface TitleProps {
  title: string
}

const Title = (props: TitleProps) => {
	return (
			<h2>{props.title}</h2>
	);
}

export default Title;