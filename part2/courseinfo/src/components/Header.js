const Header = ({ course }) => {
    return (
        <>
            <header><h1>{course.name}</h1></header>
            {course.parts.map(part => <p key={part.id}>{part.name} <span>{part.exercises}</span></p>)}
        </>
    )
}

export default Header;