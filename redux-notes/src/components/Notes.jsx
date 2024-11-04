import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import PropTypes from 'prop-types'
import noteService from '../services/notes'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      return state.notes
    }
    return state.filter  === 'IMPORTANT' 
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  })

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={async () => {
            const changedNote = await noteService.toggleImportance(note)
            dispatch(toggleImportanceOf(changedNote))
          }}
        />
      )}
    </ul>
  )
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Notes