import { useRef, useState } from 'react';

import { useRouter } from 'next/router';

import firebase from 'firebase';
import TimeAgo from 'timeago-react'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MicIcon from '@material-ui/icons/Mic';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import { auth, db } from 'config/firebase';
import getRecipientEmail from 'utils/getRecipientEmail';

import Message from 'components/message';

import {
  Container,
  Header,
  UserAvatar,
  HeaderInformation,
  HeaderIcons,
  MessageContainer,
  EndOfMessage,
  InputContainer,
  Input
} from './styles';

const ChatScreen = ({ messages, chat }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState('');
  const endOfMessageRef = useRef(null);

  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  );

  const showMessage = () => messagesSnapshot
    ? messagesSnapshot.docs.map(mess => (
      <Message
        key={mess.id}
        user={mess.data().user}
        message={{
          ...mess.data(),
          timestamp: mess.data().timestamp?.toDate().getTime()
        }}
      />
    ))
    : JSON.parse(messages).map(mess => (<Message key={mess.id} user={mess.user} message={mess} />));


  const ScrollToBottom = () => endOfMessageRef.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  const sendMessage = event => {
    event.preventDefault();

    db
      .collection('users')
      .doc(user.uid)
      .set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        {
          merge: true
        }
      );

    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL
      });

    setInput('');
    ScrollToBottom();
  };

  const recipientEmail = getRecipientEmail(chat.users, user);

  const [recipientSnapshot] = useCollection(
    db
      .collection('users')
      .where('email', '==', getRecipientEmail(chat.users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <Container>
      <Header>
        {
          recipient
            ? <UserAvatar src={recipient?.photoURL} />
            : (<UserAvatar>{recipientEmail[0]}</UserAvatar>)
        }
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {
            recipientSnapshot ? (
              <p>Last active: {' '}
                {
                  recipient?.lastSeen
                    ? (<TimeAgo dateTime={recipient?.lastSeen?.toDate()} />)
                    : 'Unavailable'
                }
              </p>
            )
              : (<p>Loading last active...</p>)
          }
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessage()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
        <Input
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyPress={event => event.key === 'Enter' ? () => sendMessage(event) : null}
        />
        <button
          hidden
          disabled={!input}
          type="submit"
          onClick={sendMessage}
        >Send Message</button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;
