import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';

import { auth } from 'config/firebase';

import {
  Container,
  Sender,
  Receiver,
  Timestamp
} from './styles';

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : ''}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  )
}

export default Message;
