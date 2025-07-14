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
  const [votes, setVotes] = useState(Array(8).fill(0));

  const updateVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }
  const randonAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * 8);
    setSelected(randomNumber)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>has {votes[selected]} Votes</p>
      <Button handleClick={updateVote} text={'Vote'} />
      <Button handleClick={randonAnecdote} text={'Next Anecdote'} />
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        <p>has {Math.max(...votes)} Votes</p>
      </div>
    </div>
  )
}

export default App;
