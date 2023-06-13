import { useMutation, useQueryClient } from 'react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { editNotice, saveNotice } from '../api/notice';

const WriteNotice = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const saveMutation = useMutation(saveNotice, {
    onSuccess: () => {
      navigate('/noticeList');
      queryClient.invalidateQueries('inquiryStoreDetail');
    },
    onError: () => {
      alert('작성실패');
    },
  });
  const editMutation = useMutation(editNotice, {
    onSuccess: () => {
      navigate(`/noticeList/${location.state.existingWriting.id}`);
      queryClient.invalidateQueries('getNoticeDetail');
    },
    onError: () => {
      alert('수정실패');
    },
  });
  useEffect(() => {
    if (location.state !== null) {
      setIsEdit(!isEdit);
      setTitle(location.state.existingWriting.title);
      setContent(location.state.existingWriting.content);
    }
  }, []);
  const noticeData = {
    title,
    content,
    id: location.state?.existingWriting.id,
  };
  const titleChangeHandle = e => {
    setTitle(e.target.value);
  };
  const contentChangeHandle = e => {
    setContent(e.target.value);
  };
  const noticeSaveButtonHandler = () => {
    if (isEdit) {
      alert(isEdit);
      editMutation.mutate(noticeData);
    } else {
      saveMutation.mutate(noticeData);
    }
  };
  return (
    <BackgroundMain>
      <NoticeH1>공지사항</NoticeH1>
      <TitleBoxDiv>
        <p>제목</p>
        <TitleInput value={title} onChange={titleChangeHandle} />
      </TitleBoxDiv>
      <TitleBoxDiv>
        <p>내용</p>
        <ContentTextarea value={content} onChange={contentChangeHandle} />
      </TitleBoxDiv>
      <ButtonPositionDiv>
        <WriteButton onClick={noticeSaveButtonHandler}>
          {isEdit ? '글 수정하기' : '글 작성하기'}
        </WriteButton>
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
  white-space: pre-wrap;
  font-size: 17px;
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
  font-size: 17px;
  white-space: pre-wrap;
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
