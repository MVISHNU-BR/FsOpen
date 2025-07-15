const Header = ({ course }) => {
    return (
        <>
            <header><h1>{course.name}</h1></header>
            {course.parts.map(part => <p key={part.id}>{part.name} <span>{part.exercises}</span></p>)}
            <h4>total of {course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)}</h4>
        </>
    )
}

export default Header;