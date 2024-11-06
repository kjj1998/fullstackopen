import { changeFilter } from "../reducers/filterReducer"
import { useDispatch, useSelector } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const content = event.target.value
    dispatch(changeFilter(content))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name='filter' value={useSelector(state => state.filter)} onChange={handleChange} />
    </div>
  )
}

export default Filter