const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map((part) =>(
    <Part name = {part.name} exercises = {part.exercises} key = {part.key}></Part>
    ))}
  </div>
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Total = (props) => <p><b>Total of {props.total} exercises</b></p>

const Course = ({course}) => {
  return(
    <>
    <Header course = {course.name} />
    <Content parts = {course.parts} />
    <Total total = {course.parts.reduce((a,part) => a + part.exercises, 0)} />
    </>
  )
}

export default Course