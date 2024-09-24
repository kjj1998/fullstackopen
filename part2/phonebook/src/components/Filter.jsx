const Filter = ({ searchTerm, handleTermChange }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={handleTermChange}/>
    </div>
  )
}

export default Filter