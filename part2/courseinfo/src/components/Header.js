const Header = ({ course }) => {
    const parts = course.parts;
    const total = parts.reduce((accumulator, currentValue) =>
        accumulator + currentValue.exercises, 0
    )

    return (
        <>
            <header><h1>{course.name}</h1></header>
            {parts.map(part => <p key={part.id}>{part.name} <span>{part.exercises}</span></p>)}
            <h4>total of {total}</h4>
        </>
    )
}

export default Header;