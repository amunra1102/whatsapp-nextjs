import styled from 'styled-components';

export const Container = styled.div`
`;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 70px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

export const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #DCF8C6;
`;

export const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: center;
`;

export const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
