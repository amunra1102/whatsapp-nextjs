import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

import getRecipientEmail from 'utils/getRecipientEmail';
import { auth, db } from 'config/firebase';

import {
  Container,
  UserAvatar
} from './styles';

const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);

  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail));

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  }

  return (
    <Container onClick={enterChat}>
      {
        recipient ? <UserAvatar src={recipient?.photoURL} /> : (<UserAvatar>{recipientEmail[0]}</UserAvatar>)
      }
      <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat;
