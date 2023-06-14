import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import api from '../../api/axios';
import defaultImage from '../../assets/defaultImage.png';
import commentBubble from '../../assets/commentBubble.png';
import commentEdit from '../../assets/commentEdit.png';
import commentDelete from '../../assets/commentDelete.png';
import ModalPortal from '../../shared/ModalPortal';

const CommentItem = ({ storeId, commentId, nickname, contents, check }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [editText, setEditText] = useState(contents);
  const [modalVisible, setModalVisible] = useState(false);

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
  const handleDelCheck = newValue => {
    if (newValue === true) {
      commentDeleteMutation.mutate();
      setModalVisible(false);
    } else if (newValue === false) {
      setModalVisible(false);
    }
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
          <ContentInput id={commentId} type="text" value={editText} disabled />
        ) : (
          <ContentInputFocus
            id="commentFocus"
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
        <CommentBtnWrapDiv>
          {isEdit ? (
            <CommentEditButton
              type="button"
              name={commentId}
              onClick={handleEditClick}
            />
          ) : (
            <button type="button" name={commentId} onClick={updateComment}>
              확인
            </button>
          )}
          {isEdit ? (
            <CommentDeleteButton
              type="button"
              commentid={commentId}
              onClick={() => setModalVisible(true)}
            />
          ) : (
            ''
          )}
        </CommentBtnWrapDiv>
      )}
      {modalVisible && (
        <ModalPortal>
          <DelModal onAccess={handleDelCheck} type="commentDelete" />
        </ModalPortal>
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
  height: 90px;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  position: relative;
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
  gap: 12px;
  width: 90%;
`;

const NicknameH1 = styled.h1`
  font-size: 13px;
  font-weight: 800;
`;
const ContentInput = styled.input`
  // span -> input으로 수정
  font-size: 12px;
  width: 100%;
  border: none;
  /* border: 1px solid #fa5938; */
  background-color: transparent;
`;
const ContentInputFocus = styled.input`
  font-size: 12px;
  width: 100%;
  border: 2px solid #fa5938;
  caret-color: #fa5938;

  &:focus {
    border: 2px solid #fa5938;
    outline: none;
  }
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
const CommentEditButton = styled.button`
  width: 20px;
  height: 16px;
  background-image: url(${commentEdit});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent;
  border: none;
  margin-right: 10px;
`;
const CommentDeleteButton = styled.button`
  width: 14px;
  height: 16px;
  background-image: url(${commentDelete});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: transparent;
  border: none;
`;
const CommentBtnWrapDiv = styled.div`
  position: absolute;
  right: 15px;
  top: 5px;
`;
