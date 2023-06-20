import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import closeIcon from '../../assets/closeIcon.png';
import commentIcon from '../../assets/commentIcon.png';
import compose from '../../assets/compose.png';
import infoIcon from '../../assets/infoIcon.png';
import * as CSS from '../../style/globalStyle';

import { commentUpdate, saveComment } from '../../api/comment';

const WriteComment = ({
  content,
  commentId,
  storeId,
  onAccess,
  mainPageLocation,
}) => {
  const [contents, setContents] = useState(content);
  const [warningMessage, setWarningMessage] = useState('');
  const [foreignEditPage, setForeignEditPage] = useState(false);
  const [writeType, setWriteType] = useState('');
  const queryClient = useQueryClient();

  const saveCommentMutation = useMutation(saveComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('getComment');
      onAccess(true);
    },
    onError: error => {
      alert('등록실패');
    },
  });
  useEffect(() => {
    if (mainPageLocation && !commentId) {
      setWriteType('후기 남기기');
    }
    if (mainPageLocation && commentId) {
      setWriteType('후기 수정하기');
    }
    if (!mainPageLocation && !commentId) {
      setWriteType('done');
    }
    if (!mainPageLocation && commentId) {
      setWriteType('revision');
    }
  }, []);
  const EditCommentMutation = useMutation(commentUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries('getComment');
      onAccess(true);
    },
    onError: error => {
      alert('수정실패');
    },
  });
  const commentOnChangeHandler = e => {
    const { value } = e.target;

    setWarningMessage('댓글은 100자 이내로만 작성해주세요');

    setContents(value);
  };

  // 댓글 저장 버튼
  const commentSaveClickButtonHandler = () => {
    if (!contents || contents.trim() === '') {
      setWarningMessage('1글자라도 입력 후 저장이 가능합니다.');
      return;
    }
    if (!commentId) {
      saveCommentMutation.mutate({
        contents,
        storeId,
      });
    } else {
      EditCommentMutation.mutate({
        contents,
        storeId,
        commentId,
      });
    }
  };
  const placeholder = mainPageLocation
    ? '소중한 후기를 입력해주세요! (100자 이내)'
    : 'Write Your Comment! (100 characters or less)';
  return (
    <ModalOverlayDiv>
      <ModalContentDiv>
        <CloseButton onClick={() => onAccess(true)} />

        <CSS.CommentInfoDiv>
          <CSS.CommentIconImg src={commentIcon} alt="commentIcon" />
          <span>{mainPageLocation ? '이용 후기' : 'Comment'}</span>
        </CSS.CommentInfoDiv>
        <TextBoxTextarea
          value={contents}
          name="contents"
          onChange={commentOnChangeHandler}
          placeholder={placeholder}
          maxLength={99}
        />

        <ValidInfoDiv>
          {warningMessage && (
            <>
              <EmailInfoImg src={infoIcon} alt="" />
              <WarningMessageP>{warningMessage}</WarningMessageP>
            </>
          )}
        </ValidInfoDiv>

        <CSS.CommentAddButton
          size="360px"
          onClick={commentSaveClickButtonHandler}
        >
          <CSS.ComposeImg src={compose} art="" />
          <span>{writeType}</span>
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
const ValidInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #afaeb7;
  margin-left: 10px;
  font-weight: 500;
  font-size: 15px;
  line-height: 34px;
  margin-top: 15px;
  gap: 11px;
  height: 18px;
`;
const EmailInfoImg = styled.img`
  width: 14px;
  height: 14px;
`;
const WarningMessageP = styled.p`
  font-weight: 500;
  font-size: 15px;
  line-height: 34px;
  color: #fa5938;
`;
