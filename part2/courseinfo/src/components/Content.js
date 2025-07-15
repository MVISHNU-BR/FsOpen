const Content = ({ parts }) => {
    const total = parts.reduce((accumulator, currentValue) =>
        accumulator + currentValue.exercises, 0
    )
    return (
        <>
            {parts.map(part => <p key={part.id}>{part.name} <span>{part.exercises}</span></p>)}
            <h4>total of {total} exercises</h4>
        </>
    )
}
export default Content