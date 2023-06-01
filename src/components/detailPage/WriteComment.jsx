import React, { useState } from 'react';
import styled from 'styled-components';
import commentIcon from '../../assets/commentIcon.png';
import closeIcon from '../../assets/closeIcon.png';
import compose from '../../assets/compose.png';
import * as CSS from '../globalStyle';
import api from '../../api/axios';

const WriteComment = ({ modal, setModal, storeId }) => {
  // const [comment, setComment] = useState({ content: '' });
  const [comment, setComment] = useState({ contents: '' });
  const { contents } = comment;

  const commentOnChangeHandler = e => {
    const { name, value } = e.target;
    if (value.length > 100) {
      alert('댓글은 100자 이내로만 작성해주세요');
      return;
    }
    setComment({ ...comment, [name]: value });
  };

  // 모달창 닫는 버튼
  const closeButtonClickHandler = () => {
    setModal(!modal);
  };
  const commentPost = async () => {
    try {
      console.log('comment:::', comment);
      await api.post(`/api/comment/${storeId}`, comment);
    } catch (error) {
      console.log(error);
    }
  };
  // 댓글 저장 버튼
  const commentSaveClickButtonHandler = () => {
    if (!contents || contents.trim() === '') {
      alert('1글자라도 입력 후 저장이 가능합니다.');
      return;
    }
    commentPost();
    setModal(!modal);
  };

  return (
    <ModalOverlayDiv>
      <ModalContentDiv>
        <CloseButton onClick={closeButtonClickHandler} />
        <CSS.CommentInfoDiv>
          <CSS.CommentIconImg src={commentIcon} alt="commentIcon" />
          <span>이용 후기</span>
        </CSS.CommentInfoDiv>
        <TextBoxTextarea
          value={contents}
          name="contents"
          onChange={commentOnChangeHandler}
          placeholder="소중한 후기를 입력해주세요! (100자 이내)"
        ></TextBoxTextarea>
        <CSS.CommentAddButton
          size="360px"
          onClick={commentSaveClickButtonHandler}
        >
          <CSS.ComposeImg src={compose} art="" />
          <span>후기 남기기</span>
        </CSS.CommentAddButton>
      </ModalContentDiv>
    </ModalOverlayDiv>
  );
};

export default WriteComment;

const ModalOverlayDiv = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(49, 49, 49, 0.4);
  z-index: 10;
`;
const ModalContentDiv = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 14px;
  border-radius: 30px;
  max-width: 600px;
  min-width: 300px;
  width: 560px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  padding-left: 49px;
  padding-right: 49px;
  padding-bottom: 50px;
`;
const TextBoxTextarea = styled.textarea`
  width: 462px;
  height: 197px;
  margin-top: 22px;
  margin-bottom: 16px;
  background-color: #ededed;
  border: none;
  border-radius: 10px;
  white-space: pre-line;
  resize: none;
  padding: 19px 30px 19px 30px;
  font-size: 20px;
  &:focus {
    outline: none;
  }
`;
const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  color: #bebebe;
  position: absolute;
  top: 25px;
  right: 40px;
  background-image: url(${closeIcon});
  background-size: cover;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
