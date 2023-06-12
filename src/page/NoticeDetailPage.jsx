import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';
import writeIcon from '../assets/writeIcon.png';
import menuIcon from '../assets/menuIcon.png';

const NoticeDetailPage = () => {
  const [existingWriting, setExistingWriting] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const dummyList = {
    id: params.id,
    title: '이건 공지입니다.',
    content:
      '이런 저런 오류가 발생하여 이렇게 저렇게 수정하였습니다 이런식으로 사용해주시기 바랍니다',
    nickname: 'uri',
    creationDate: '2023.07.07',
    noticeList: [
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
    ],
  };
  useEffect(() => {
    setExistingWriting({
      title: dummyList.title,
      content: dummyList.content,
    });
  }, []);
  const noticeDetailPageMoveButtonHandler = id => {
    navigate(`/noticeList/${id}`);
  };
  const noticeListMoveButtonHandler = () => {
    navigate('/noticeList');
  };
  const noticeModifyMoveButtonHandler = () => {
    if (existingWriting !== null) {
      navigate('/WriteNotice', { state: { existingWriting } });
    }
  };
  return (
    <BackgroundMain>
      <NoticeH1>공지사항</NoticeH1>
      <WriteBoxDiv>
        <WriteButton>
          <WriteIconImg src={writeIcon} alt="" />
          <WriteTextP onClick={noticeModifyMoveButtonHandler}>
            {' '}
            글 수정{' '}
          </WriteTextP>
        </WriteButton>
        <WriteButton>
          <WriteIconImg src={menuIcon} alt="" />
          <WriteTextP onClick={noticeListMoveButtonHandler}>목록</WriteTextP>
        </WriteButton>
      </WriteBoxDiv>
      <ListSection>
        <TitleDiv>
          <NoticeDetailP
            weight="700"
            size="108px"
            fontSize="20px"
            position="center"
          >
            제목
          </NoticeDetailP>
          <NoticeDetailP weight="500" size="577px" fontSize="20px">
            {dummyList.title}
          </NoticeDetailP>
          <NoticeDetailP
            weight="700"
            size="150px"
            fontSize="20px"
            position="center"
          >
            작성일자
          </NoticeDetailP>
          <NoticeDetailP weight="500" size="210px" fontSize="20px">
            {dummyList.creationDate}
          </NoticeDetailP>
        </TitleDiv>
        <ContentDiv>{dummyList.content}</ContentDiv>
        <NoticeItemDiv>
          <NoticeP size="108px" key={dummyList.noticeList[0].id}>
            이전글
          </NoticeP>
          <NoticeP
            size="617px"
            cursor="pointer"
            onClick={() =>
              noticeDetailPageMoveButtonHandler(dummyList.noticeList[0].id)
            }
          >
            {dummyList.noticeList[0].title}
          </NoticeP>
          <NoticeP size="150px">{dummyList.noticeList[0].nickname}</NoticeP>
          <NoticeP size="250px">{dummyList.noticeList[0].creationDate}</NoticeP>
        </NoticeItemDiv>
        <NoticeItemDiv>
          <NoticeP size="108px" key={dummyList.noticeList[0].id}>
            다음글
          </NoticeP>
          <NoticeP
            size="617px"
            cursor="pointer"
            onClick={() =>
              noticeDetailPageMoveButtonHandler(dummyList.noticeList[1].id)
            }
          >
            {dummyList.noticeList[1].title}
          </NoticeP>
          <NoticeP size="150px">{dummyList.noticeList[1].nickname}</NoticeP>
          <NoticeP size="250px">{dummyList.noticeList[1].creationDate}</NoticeP>
        </NoticeItemDiv>
      </ListSection>
    </BackgroundMain>
  );
};

export default NoticeDetailPage;

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
  margin-bottom: 8px;
`;
const ListSection = styled.section`
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
`;

const TitleDiv = styled.div`
  width: 1127px;
  height: 60px;
  border-bottom: 1px solid #dadada;
  display: flex;
  flex-direction: row;
  align-items: center;
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
const NoticeDetailP = styled.p`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.position === 'center' ? '#FAFAFA' : 'transparent'};
  margin-right: ${props => (props.position === 'center' ? '40px' : '0')};
  justify-content: ${props => `${props.position}`};
  width: ${props => `${props.size}`};
  cursor: ${props => `${props.cursor}`};
  font-weight: ${props => `${props.weight}`};
  font-size: ${props => `${props.fontSize}`};
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
const ContentDiv = styled.div`
  padding-top: 25px;
  padding-left: 27px;
  padding-right: 27px;
  padding-bottom: 25px;
  border-bottom: 1px solid #dadada;

  height: 350px;
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
`;
