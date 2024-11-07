import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  // Sort and filter after selecting the original array from state
  const filteredAnecdotes = [...anecdotes]
    .filter((anecdote) => anecdote.content.includes(filter))
    .sort((a, b) => b.votes - a.votes);

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;