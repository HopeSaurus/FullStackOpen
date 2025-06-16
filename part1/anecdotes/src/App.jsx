import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Paragraph = ({text}) => {
  return(
    <p>{text}</p>
  )
}
const Anecdotes = (props) => {
  const text = props.text
  const onClickAnecdote = props.onClickAnecdote
  const onClickVote = props.onClickVote
  const votes = props.votes
  return(
  <>
    <Paragraph text = {text} />
    <Button text = "vote" onClick={onClickVote}/>
    <Button text = "next anecdote" onClick={onClickAnecdote} />
    <Paragraph text = {`has ${votes} votes`} />
  </>
  )
}
const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  
  const handleVoteClick = () => {
    const newVotes = { ...votes }
    newVotes[selected]? newVotes[selected] += 1: newVotes[selected] = 1
    setVotes(newVotes)
    console.log(votes)
}

  const getMaxIndex = (obj) => {
    const objValues =  Object.values(obj)
    const maxValue = Math.max(... objValues)
    return maxValue == 0? -1: Object.keys(obj).find((key) => obj[key] === maxValue)
  }

  const mostVoted = getMaxIndex(votes) >= 0? anecdotes[getMaxIndex(votes)]: "No votes registered"

  return (
    <div>
      <Header text = "Anecdote of the day" />
      <Anecdotes text = {anecdotes[selected]} 
      onClickVote = {handleVoteClick}
      onClickAnecdote = { () => setSelected(Math.round(Math.random() * (anecdotes.length-1)))}
        votes = {votes[selected]? votes[selected]: 0}/>
      <Header text="Anecdote with most votes" />
      <Paragraph text={mostVoted}/>
    </div>
  )
}

export default App
