import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import api from '../../api/axios';
import commentDelete from '../../assets/commentDelete.png';
import commentEdit from '../../assets/commentEdit.png';
import defaultImage from '../../assets/defaultImage.png';
import ModalPortal from '../../shared/ModalPortal';
import CommentDelModal from './CommentDelModal';
import WriteComment from './WriteComment';

const CommentItem = ({
  storeId,
  commentId,
  nickname,
  contents,
  check,
  imageUrl,
  createdAt,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const queryClient = useQueryClient();

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
    setIsModal(prev => !prev);
  };
  const commentCreatedAt = createdAt.slice(0, 10);
  return (
    <CommentItemDiv key={commentId}>
      {imageUrl === '' ? (
        <DefaultProfileImg src={defaultImage} alt="profileImg" />
      ) : (
        <DefaultProfileImg src={imageUrl} alt="profileImg" />
      )}
      <CommentContentBoxDiv>
        <NameAndDateDiv>
          <NicknameH1>{nickname}</NicknameH1>
          <CreatedAtP>{commentCreatedAt}</CreatedAtP>
        </NameAndDateDiv>
        <ContentP>{contents}</ContentP>
      </CommentContentBoxDiv>
      {check && (
        <CommentBtnWrapDiv>
          <CommentEditButton
            type="button"
            name={commentId}
            onClick={handleEditClick}
          />
          <CommentDeleteButton
            type="button"
            commentid={commentId}
            onClick={() => setModalVisible(true)}
          />
        </CommentBtnWrapDiv>
      )}
      {isModal && (
        <ModalPortal>
          <WriteComment
            onAccess={handleEditClick}
            storeId={storeId}
            commentId={commentId}
            content={contents}
            mainPageLocation="true"
          />
        </ModalPortal>
      )}
      {modalVisible && (
        <ModalPortal>
          <CommentDelModal onAccess={handleDelCheck} />
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
  cursor: pointer;
`;

// 이미지
const DefaultProfileImg = styled.img`
  width: 46px;
  height: 46px;
  margin-right: 34px;
  border-radius: 50%;
`;

const CommentContentBoxDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  width: 90%;
`;

const NicknameH1 = styled.h1`
  font-size: 16px;
  font-weight: 800;
`;
const ContentP = styled.p`
  font-size: 14px;
  border: none;
  /* border: 1px solid #fa5938; */
  background-color: transparent;
  word-wrap: break-word;
  white-space: pre-line;
  line-height: 17px;
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
  cursor: pointer;
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
  cursor: pointer;
`;
const CommentBtnWrapDiv = styled.div`
  position: absolute;
  right: 15px;
  top: 5px;
`;
const NameAndDateDiv = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  gap: 10px;
  font-size: 11px;
`;
const CreatedAtP = styled.p`
  margin-top: 5px;
  color: #808080;
`;
