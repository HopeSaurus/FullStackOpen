const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  const Header = (props) => {
    return(
    <h1>{props.course.name}</h1>
    )
  }

  const Part = (props) => {
    return(
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  const Content = (props) => {
    return(
      <>
      {props.parts.map(function(part) {
        return <Part part = {part} />
      })}
      </>
    )
  }

  const Total = (props) => {
    return(
      <p>Number of exercises {props.parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
    )
  }

  return (
    <div>
      <Header course={course} />    
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
  
}



export default App