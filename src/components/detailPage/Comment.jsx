import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import commentIcon from '../../assets/commentIcon.png';
import defaultImage from '../../assets/defaultImage.png';
import commentBubble from '../../assets/commentBubble.png';
import compose from '../../assets/compose.png';
import * as CSS from '../globalStyle';
import WriteComment from './WriteComment';
import api from '../../api/axios';

const dummyList = [
  {
    commentId: 1,
    content: '나는 댓글이다',
    storeId: 1,
    nickname: '김은서',
    check: true,
    recomment: [
      {
        recommentId: 1,
        content: '내용',
      },
      {
        recommentId: 2,
        content: '내용',
      },
    ],
  },
  {
    commentId: 2,
    content: '나는 댓글이다2',
    storeId: 1,
    nickname: '김은서',
    check: true,
    recomment: [
      {
        recommentId: 1,
        content: '내용',
      },
      {
        recommentId: 2,
        content: '내용',
      },
    ],
  },
  {
    commentId: 3,
    content: '나는 댓글이다2',
    storeId: 1,
    nickname: '김은서',
    check: true,
    recomment: [
      {
        recommentId: 1,
        content: '내용',
      },
      {
        recommentId: 2,
        content: '내용',
      },
    ],
  },
  {
    commentId: 3,
    content: '나는 댓글이다2',
    storeId: 1,
    nickname: '김은서',
    check: true,
    recomment: [
      {
        recommentId: 1,
        content: '내용',
      },
      {
        recommentId: 2,
        content: '내용',
      },
    ],
  },
  {
    commentId: 3,
    content: '나는 댓글이다2',
    storeId: 1,
    nickname: '김은서',
    check: true,
    recomment: [
      {
        recommentId: 1,
        content: '내용',
      },
      {
        recommentId: 2,
        content: '내용',
      },
    ],
  },
  {
    commentId: 3,
    content: '나는 댓글이다2',
    storeId: 1,
    nickname: '김은서',
    check: true,
    recomment: [
      {
        recommentId: 1,
        content: '내용',
      },
      {
        recommentId: 2,
        content: '내용',
      },
    ],
  },
];

const Comment = ({ storeId }) => {
  const [modal, setModal] = useState(false);
  const CommentAddModalOpenHandler = () => {
    setModal(!modal);
  };
  const getCommentHandler = async () => {
    const response = await api.get(`/api/comment/${storeId}`);
    return response;
  };
  const { data, isLoading, error } = useQuery('getComment', getCommentHandler);
  console.log('error:::', error);

  return (
    <CommentBoxSection>
      <CSS.CommentInfoDiv>
        <CSS.CommentIconImg src={commentIcon} alt="" />
        <span>이용후기</span>
      </CSS.CommentInfoDiv>
      <CommentListArticle>
        {!isLoading &&
          data?.map(item => {
            return (
              <CommentItemDiv key={item.commentId}>
                <DefaultProfileImg src={defaultImage} alt="" />
                <CommentContentBoxDiv>
                  <NicknameH1>{item.nickname}</NicknameH1>
                  <ContentSpan>{item.content}</ContentSpan>
                  <ReCommentButton>
                    <CommentBubbleIconImg src={commentBubble} alt="" />
                    {item.recomment.length}
                  </ReCommentButton>
                </CommentContentBoxDiv>
                <button type="button">수정</button>
                <button type="button">삭제</button>
              </CommentItemDiv>
            );
          })}
      </CommentListArticle>
      <ButtonBoxDiv>
        <CSS.CommentAddButton size="360px" onClick={CommentAddModalOpenHandler}>
          <CSS.ComposeImg src={compose} art="" />
          <span>소중한 후기를 남겨주세요.</span>
        </CSS.CommentAddButton>
        {modal && (
          <WriteComment modal={modal} setModal={setModal} storeId={storeId} />
        )}
      </ButtonBoxDiv>
    </CommentBoxSection>
  );
};

export default Comment;

const CommentBoxSection = styled.section`
  margin-top: 87px;
  width: 610px;
  height: 388px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
`;
const CommentListArticle = styled.article`
  margin-top: 11px;
  width: 610px;
  height: 285px;
  border-top: 1px solid #dadada;
  overflow: scroll;
`;
// 댓글 리스트 박스
const CommentItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  height: 70px;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
`;

// 이미지
const DefaultProfileImg = styled.img`
  width: 46px;
  height: 46px;
  margin-right: 34px;
`;
const CommentBubbleIconImg = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 5px;
`;

const CommentContentBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const NicknameH1 = styled.h1`
  font-size: 13px;
  font-weight: 800;
`;
const ContentSpan = styled.span`
  font-size: 12px;
`;
const ReCommentButton = styled.button`
  border: none;
  font-size: 8px;
  color: #686868;
  height: 11px;
  display: flex;
  align-items: center;
  text-align: left;
  background-color: transparent;
  padding-left: 0;
  cursor: pointer;
`;
const ButtonBoxDiv = styled.div`
  display: flex;
  justify-content: center;
`;
