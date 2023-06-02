import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import api from '../../api/axios';
import defaultImage from '../../assets/defaultImage.png';
import commentBubble from '../../assets/commentBubble.png';

const CommentItem = ({ storeId, commentId, nickname, contents, check }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [editText, setEditText] = useState('');
  const queryClient = useQueryClient();

  const commentUpdateMutation = useMutation(
    newComment => api.put(`/api/comment/${storeId}/${commentId}`, newComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getComment');
      },
    }
  );
  const updateComment = () => {
    commentUpdateMutation.mutate({ contents: editText });
    setIsEdit(prev => !prev);
  };

  const commentDeleteMutation = useMutation(
    () => api.delete(`/api/comment/${storeId}/${commentId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getComment');
      },
    }
  );
  const deleteComment = () => {
    commentDeleteMutation.mutate();
  };

  const handleEditClick = () => {
    setIsEdit(prev => !prev);
  };

  const handleInputChange = e => {
    const { value } = e.target;
    setEditText(value);
  };

  return (
    <CommentItemDiv key={commentId}>
      <DefaultProfileImg src={defaultImage} alt="profileImg" />
      <CommentContentBoxDiv>
        <NicknameH1>{nickname}</NicknameH1>
        {isEdit ? (
          <ContentInput id={commentId} type="text" value={contents} disabled />
        ) : (
          <ContentInput
            id={commentId}
            type="text"
            value={editText}
            onChange={handleInputChange}
          />
        )}
        <ReCommentButton>
          <CommentBubbleIconImg src={commentBubble} alt="" />
        </ReCommentButton>
      </CommentContentBoxDiv>
      {check && (
        <>
          {isEdit ? (
            <button type="button" name={commentId} onClick={handleEditClick}>
              수정
            </button>
          ) : (
            <button type="button" name={commentId} onClick={updateComment}>
              확인
            </button>
          )}
          {isEdit ? (
            <button type="button" commentid={commentId} onClick={deleteComment}>
              삭제
            </button>
          ) : (
            ''
          )}
        </>
      )}
    </CommentItemDiv>
  );
};

export default CommentItem;

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
const ContentInput = styled.input`
  // span -> input으로 수정
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
