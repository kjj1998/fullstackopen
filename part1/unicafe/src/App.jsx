import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{ text }</h1>
  )
}

const Rating = ({ text, value }) => {
  return (
    <div>{ text } { value }</div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      { text }
    </button>
  )
}

const ButtonRow = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
  return (
    <div>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <ButtonRow good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} />
      <Header text="statistics" />
      <Rating text="good" value={good} />
      <Rating text="neutral" value={neutral} />
      <Rating text="bad" value={bad} />
    </div>
  )
}

export default App