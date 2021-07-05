import Head from 'next/head';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from 'config/firebase';
import getRecipientEmail from 'utils/getRecipientEmail';

import { ChatScreen, Sidebar } from 'components';

const ChatItem = ({ messages, chat }) => {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
`;

export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id);
  const messageRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  const messages = messageRes.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })).map(mess => ({
    ...mess,
    timestamp: mess.timestamp.toDate().getTime()
  }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data()
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat
    },
  }
}

export default ChatItem;
