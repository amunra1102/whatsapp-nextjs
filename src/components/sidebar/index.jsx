import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as EmailValidator from 'email-validator';

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
  const createChat = () => {
    const input = prompt('Please enter an email address for the user you wish to chat with');

    if (!input) {
      return null;
    }

    if (EmailValidator.validate(input)) {

    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar />
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

      <SidebarButton>Start a new chat</SidebarButton>
    </Container>
  );
};

export default Sidebar;
