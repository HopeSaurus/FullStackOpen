const Persons = ({persons, deletePerson}) => {
  return(
    <>
    {persons.map((record)=>( <div key={record.id}>{record.name} {record.number}
      <button onClick={() => deletePerson(record.id, record.name)}>delete</button>
    </div> ))}
    </>
  )
}

export default Persons 