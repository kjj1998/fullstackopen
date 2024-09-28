const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className={ messageType === 'success' ? 'success' : 'error' }>
        { message }
      </div>
    )
  }
}

export default Notification