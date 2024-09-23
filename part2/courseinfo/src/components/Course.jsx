const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      parts.map(part => 
        <Part 
          key={part.id} 
          name={part.name} 
          exercises={part.exercises}/>
      )
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce(
      (accumulator, curPart) => accumulator + curPart.exercises,
      0
    )
  
    return (
      <p><strong>total of {total} exercises</strong></p>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
  }

export default Course