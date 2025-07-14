import { useState } from "react";
const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}
function App() {
  const [selected, setSelected] = useState(0);
  const anecdotes = [
    'If doing something hurts, do it more often.',
    'Hiring labor for a software project thats already behind schedule makes it even later!',
    'The first 90% of the code found in the first 10% of development time... The other 10% of the code found in the other 90% of development time.',
    'Any fool writes code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'First of all, debugging is twice as hard as writing the code. Therefore, if you write your code as cleverly as possible, you are, by definition, not clever enough to debug it.',
    'Programming without extremely heavy use of console.log is like a doctor refusing to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ]
  const randonAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 8);
    setSelected(randomNumber)

  }
  return (
    <div>
      <p>
        {anecdotes[selected]}
      </p>
      <Button handleClick={randonAnecdote} text={'Next Anecdote'}></Button>
    </div>
  )
}

export default App;
