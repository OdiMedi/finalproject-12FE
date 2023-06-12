import React from 'react';
import styled from 'styled-components';

const WriteNotice = () => {
  return (
    <BackgroundMain>
      <NoticeH1>공지사항</NoticeH1>
      <TitleBoxDiv>
        <p>제목</p>
        <TitleInput />
      </TitleBoxDiv>
      <TitleBoxDiv>
        <p>내용</p>
        <ContentTextarea />
      </TitleBoxDiv>
      <ButtonPositionDiv>
        <WriteButton>글 작성하기</WriteButton>
      </ButtonPositionDiv>
    </BackgroundMain>
  );
};

export default WriteNotice;

const BackgroundMain = styled.main`
  margin-left: auto;
  margin-right: auto;
  height: 700px;
  width: 1113px;
`;
const NoticeH1 = styled.h1`
  font-weight: 800;
  font-size: 32px;
  line-height: 43px;
  margin-top: 70px;
  margin-bottom: 50px;
`;

const TitleBoxDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 56px;
  margin-bottom: 21px;

  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;
const TitleInput = styled.input`
  border: 2px solid #dadada;
  border-radius: 5px;
  width: 976px;
  height: 26px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  &:focus {
    outline: none;
  }
`;
const ContentTextarea = styled.textarea`
  border: 2px solid #dadada;
  border-radius: 5px;
  width: 976px;
  height: 480px;
  padding: 20px;
  resize: none;

  &:focus {
    outline: none;
  }
`;
const WriteButton = styled.button`
  background-color: #fa5938;
  border-radius: 10px;
  border: none;
  width: 140px;
  height: 50px;

  font-weight: 900;
  font-size: 18px;
  line-height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
  }
`;
const ButtonPositionDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
