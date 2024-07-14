import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.sidebarBackground};
  padding: 10px;
  overflow-y: auto;
  
`;

const ChatItem = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.avatarBackground};
`;

const ChatInfo = styled.div`
  margin-left: 10px;
`;

const ChatName = styled.div`
  font-weight: bold;
  font-size: 14px; // smaller text size
`;

const LastMessage = styled.div`
  color: ${(props) => props.theme.lastMessageColor};
  font-size: 12px; // smaller text size
`;

const Sidebar = ({ chats, setCurrentChat }) => {
  return (
    <SidebarContainer>
      {chats.map(chat => (
        <ChatItem key={chat.id} onClick={() => setCurrentChat(chat)}>
          <Avatar />
          <ChatInfo>
            <ChatName>{chat.creator.name}</ChatName>
            <LastMessage></LastMessage>
          </ChatInfo>
        </ChatItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;