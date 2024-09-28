const Filter = ({ searchTerm, handleTermChange }) => {
  return (
    <div>
      filter shown with <input name='term' value={searchTerm} onChange={handleTermChange}/>
    </div>
  )
}

export default Filter