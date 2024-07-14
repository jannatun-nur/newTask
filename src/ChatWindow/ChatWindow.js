import React from 'react';
import styled from 'styled-components';

const ChatWindowContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: ${(props) => props.theme.chatBackground};
 
`;

const Message = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  background-color: ${(props) => (props.sent ? props.theme.sentMessageBackground : props.theme.receivedMessageBackground)};
  align-self: flex-end;
  width:700px;

`;

const ChatWindow = ({ messages }) => {
  console.log(messages)

  return (
    <ChatWindowContainer>
      {messages?.map((msg, index) => (
        <Message key={index} sent={msg.sent}>
          {msg.message}
        </Message>
      ))}
    </ChatWindowContainer>
  );
};

export default ChatWindow;
