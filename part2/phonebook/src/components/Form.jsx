const Form = ({onSubmit, onChangeName, onChangeNumber, nameValue, numberValue}) => {
  return(
    <>
    <h2>Add new</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={onChangeName} value={nameValue}/>
        </div>
        <div>number: <input onChange={onChangeNumber} value={numberValue}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default Form