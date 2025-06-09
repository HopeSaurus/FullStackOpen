import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Statistics = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral
  const all = props.all
    
  if(all <= 0){
    return (
    <>
    <Header text="statistics" />
    <p>No feedback given</p>
    </>
    )
  }
  return (
  <>
  <Header text="statistics" />
  <p>good {good}</p>
  <p>neutral {neutral}</p>
  <p>bad {bad}</p>
  <p>all {all}</p>
  <p>average {(all > 0)?(good - bad) / all: 0}</p>
  <p>positive {(all > 0)?good / all * 100: 0}%</p>
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  return (
    <div>
      <Header text="give feedback" />

      <Button onClick={() => {setGood(good + 1)
        setAll(all + 1)
      }} text="good" />

      <Button onClick={() => {setNeutral(neutral + 1)
        setAll(all + 1)
      }} text="neutral" />

      <Button onClick={() => {setBad(bad + 1)
        setAll(all + 1)
      }} text="bad" />

      <Statistics good = {good} bad = {bad} neutral = {neutral} all = {all}/>
    </div>
  )
}

export default App