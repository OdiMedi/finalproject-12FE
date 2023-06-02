import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import commentIcon from '../../assets/commentIcon.png';
import compose from '../../assets/compose.png';
import * as CSS from '../globalStyle';
import WriteComment from '../detailPage/WriteComment';
import api from '../../api/axios';
import CommentItem from './CommentItem';

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

  const { data, isLoading } = useQuery('getComment', getCommentHandler);

  return (
    <CommentBoxSection>
      <CSS.CommentInfoDiv>
        <CSS.CommentIconImg src={commentIcon} alt="" />
        <span>이용후기</span>
      </CSS.CommentInfoDiv>
      <CommentListArticle>
        {!isLoading &&
          data?.data.map(item => {
            return (
              <CommentItem
                key={item.commentId}
                storeId={storeId}
                commentId={item.commentId}
                nickname={item.nickname}
                contents={item.contents}
              />
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
const ButtonBoxDiv = styled.div`
  display: flex;
  justify-content: center;
`;
