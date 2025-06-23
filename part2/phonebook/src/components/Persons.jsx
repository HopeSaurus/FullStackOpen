const Persons = ({persons}) => {
  return(
    <>
    {persons.map((record)=>( <div key={record.id}>{record.name} {record.number}</div> ))}
    </>
  )
}

export default Persons 