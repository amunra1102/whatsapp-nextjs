import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { auth, db } from 'config/firebase';
import Chat from 'components/chat';

import {
  Container,
  Header,
  UserAvatar,
  IconContainer,
  Search,
  SearchInput,
  SidebarButton
} from './styles';

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt('Please enter an email address for the user you wish to chat with');

    if (!input) {
      return null;
    }

    if (EmailValidator.validate(input) && input !== user.email && !chatAlreadyExists(input)) {
      db.collection('chats').add({
        users: [user.email, input]
      });
    }
  };

  const chatAlreadyExists = recipientEmail => !!chatSnapshot?.docs.find(
    chat => chat.data().users.find(usr => usr === recipientEmail)?.length > 0
  );

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search in chats' />
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {
        chatSnapshot?.docs.map(chat => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))
      }
    </Container>
  );
};

export default Sidebar;
