interface ErrorNotificationProps {
  message: string
};

const ErrorNotification = (props: ErrorNotificationProps) => {
  if (props.message === '') {
    return;
  } else {
    return <p style={{ color: 'red' }}>{props.message}</p>;
  }
};

export default ErrorNotification;