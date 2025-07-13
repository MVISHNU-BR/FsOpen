import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = bad + neutral + good;
  let average = (good - bad) / all;
  let positive = (good / all) * 100;

  return (
    <div><h1>give feedback</h1>

      <div>
        <Button handleClick={() => setGood(good + 1)} text={'good'} />
        <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
        <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      </div>

      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  );
}

export default App;
