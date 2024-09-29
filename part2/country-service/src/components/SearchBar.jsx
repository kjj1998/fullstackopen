const SearchBar = ({ searchTerm, handleTermChange }) => {
  return (
    <div>
      find countries <input value={searchTerm} onChange={handleTermChange}/>
    </div>
  )
}

export default SearchBar