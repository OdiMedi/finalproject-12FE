import React from 'react';
import styled from 'styled-components';
import commentIcon from '../../assets/commentIcon.png';
import defaultImage from '../../assets/defaultImage.png';
import commentBubble from '../../assets/commentBubble.png';
import compose from '../../assets/compose.png';
import CommentItem from '../comment/CommentItem';

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
  return (
    <CommentBoxSection>
      <CommentInfoDiv>
        <CommentIconImg src={commentIcon} alt="" />
        <span>이용후기</span>
      </CommentInfoDiv>
      <CommentListArticle>
        {/* {dummyList.map(item => {
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
            </CommentItemDiv>
          );
        })} */}
        {dummyList.map(item => {
          return (
            <CommentItem
              key={item.commentId}
              commnetId={item.commentId}
              storeId={item.storeId}
              nickname={item.nickname}
              content={item.content}
              // recommentLength={item.recomment.length}
              check={item.check}
            />
          );
        })}
      </CommentListArticle>
      <CommentAddButton>
        소중한 후기를 남겨주세요.
        <ComposeImg src={compose} art="" />
      </CommentAddButton>
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
const CommentIconImg = styled.img`
  width: 20px;
  height: 18px;
  margin-left: 15px;
  margin-right: 9px;
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

const CommentInfoDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
`;
const CommentAddButton = styled.button`
  width: 360px;
  height: 40px;
  margin-left: 140px;
  margin-top: 24px;
  background-color: #fa5938;
  border: none;
  border-radius: 32px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  position: relative;
`;
const ComposeImg = styled.img`
  width: 14px;
  height: 14px;
  position: absolute;
  top: 13px;
  left: 75px;
`;
