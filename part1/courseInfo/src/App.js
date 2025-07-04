const Header = (props) => {
  return (
    <header>
      <h1>{props.course}</h1>
    </header>
  )
}
const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}
const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  )
}
const Total = (props) => {
  let total = 0;
  props.parts.forEach(element => {
    total += element.exercises
  });
  return (
    <>
      <p>Number of exercises {total}</p>

    </>
  )
}
function App() {
  const course = {
    name: "Half Stack Application Development",
    parts: [
      {
        name: "React basics",
        exercises: 10
      },
      {
        name: "Using Props to pass Data",
        exercises: 7,
      },
      {
        name: "Component State",
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div >
  );
}

export default App;
