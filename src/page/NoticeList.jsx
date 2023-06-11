import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import writeIcon from '../assets/writeIcon.png';

const dummyList = [
  {
    id: 1,
    title: '이건 공지입니다.',
    nickname: 'uri',
    creationDate: '2023.07.07',
  },
  {
    id: 2,
    title: '이건 공지입니다.',
    nickname: 'uri',
    creationDate: '2023.07.07',
  },
  {
    id: 3,
    title: '이건 공지입니다.',
    nickname: 'uri',
    creationDate: '2023.07.07',
  },
  {
    id: 4,
    title: '이건 공지입니다.',
    nickname: 'uri',
    creationDate: '2023.07.07',
  },
  {
    id: 5,
    title: '이건 공지입니다.',
    nickname: 'uri',
    creationDate: '2023.07.07',
  },
  {
    id: 6,
    title: '이건 공지입니다.',
    nickname: 'uri',
    creationDate: '2023.07.07',
  },
  {
    id: 7,
    title: '이건 공지입니다.',
    nickname: 'uri',
    creationDate: '2023.07.07',
  },
  {
    id: 8,
    title: '이건 공지입니다.',
    nickname: 'uri',
    creationDate: '2023.07.07',
  },
  // {
  //   id: 9,
  //   title: '이건 공지입니다.',
  //   nickname: 'uri',
  //   creationDate: '2023.07.07',
  // },
];

const NoticeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const totalItems = dummyList.length;

  const NoticeListPageNumber = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    NoticeListPageNumber.push(i);
  }
  const handlePageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };
  const noticeDetailPageMoveButtonHandler = id => {
    navigate(`/noticeList/${id}`);
  };
  return (
    <BackgroundMain>
      <NoticeH1>공지사항</NoticeH1>
      <WriteBoxDiv>
        <WriteButton>
          <WriteIconImg src={writeIcon} alt="" />
          <WriteTextP> 글 작성 </WriteTextP>
        </WriteButton>
      </WriteBoxDiv>
      <ListSection>
        <TitleDiv>
          <NoticeP size="108px">번호</NoticeP>
          <NoticeP size="617px">제목</NoticeP>
          <NoticeP size="150px">작성자</NoticeP>
          <NoticeP size="250px">작성날짜</NoticeP>
        </TitleDiv>
        {dummyList.map(item => {
          return (
            <NoticeItemDiv key={item.id}>
              <NoticeP size="108px">{item.id}</NoticeP>
              <NoticeP
                size="617px"
                cursor="pointer"
                onClick={() => noticeDetailPageMoveButtonHandler(item.id)}
              >
                {item.title}
              </NoticeP>
              <NoticeP size="150px">{item.nickname}</NoticeP>
              <NoticeP size="250px">{item.creationDate}</NoticeP>
            </NoticeItemDiv>
          );
        })}
      </ListSection>
      <ListNumberBoxDiv>
        {NoticeListPageNumber.map((item, index) => {
          return (
            <>
              {index !== 0 && <span>|</span>}
              <ListNumberButton
                isActive={currentPage === item}
                onClick={() => handlePageClick(item)}
              >
                {item}
              </ListNumberButton>
            </>
          );
        })}
      </ListNumberBoxDiv>
    </BackgroundMain>
  );
};

export default NoticeList;

const BackgroundMain = styled.main`
  margin-left: auto;
  margin-right: auto;
  height: 700px;
  width: 1127px;
`;
const NoticeH1 = styled.h1`
  font-weight: 800;
  font-size: 32px;
  line-height: 43px;
  margin-top: 70px;
  margin-bottom: 25px;
`;
const ListSection = styled.section`
  border-top: 1px solid #dadada;
  height: 550px;
`;

const TitleDiv = styled.div`
  width: 1127px;
  height: 60px;
  border-bottom: 1px solid #dadada;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fafafa;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;
const NoticeItemDiv = styled.div`
  width: 1127px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #dadada;
`;
const NoticeP = styled.p`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => `${props.size}`};
  cursor: ${props => `${props.cursor}`};
`;
const WriteBoxDiv = styled.div`
  display: flex;
  justify-content: end;
  gap: 30px;
`;
const WriteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 28px;
`;
const WriteIconImg = styled.img`
  width: 20px;
  height: 20px;
`;
const WriteTextP = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #686868;
`;
const ListNumberBoxDiv = styled.div`
  margin-top: 12px;
  width: 1131px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 10px;
  color: #afaeb7;
`;
const ListNumberButton = styled.button`
  font-weight: ${({ isActive }) => (isActive ? '700' : '400')};
  font-size: 14px;
  color: #686868;
  background-color: transparent;
  height: 30px;
  border: none;
  cursor: pointer;
`;
