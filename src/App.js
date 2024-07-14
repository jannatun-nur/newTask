import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import ChatWindow from './ChatWindow/ChatWindow';
import { lightTheme, darkTheme } from './Theme/Theme';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import Sidebar from './Sidebar/Sidebar';
import { GiMoon } from "react-icons/gi";

const AppContainer = styled.div`
   display: flex;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  position: relative;
  height: 100vh;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const FixedSidebar = styled(Sidebar)`
  width: 250px;
  flex-shrink: 0;
`;

const ChatArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;


function App() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1')
      .then(response => setChats(response.data.data.data))
      .catch(error => console.error('Error fetching chats:', error));
  }, []);

  useEffect(() => {
    if (currentChat) {
      axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${currentChat.id}`)
        .then(response => setMessages(response.data.data))
        .catch(error => console.error('Error fetching messages:', error));
    } else {
      setMessages([]);
    }
  }, [currentChat]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppContainer>
        <ToggleButton onClick={toggleTheme}>
          <GiMoon size={30} />
        </ToggleButton>
        <ContentContainer>
          <FixedSidebar chats={chats} setCurrentChat={setCurrentChat} />
          <ChatArea>
            <ChatWindow messages={messages} />
          </ChatArea>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
