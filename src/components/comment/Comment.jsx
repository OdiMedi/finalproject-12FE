import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import commentIcon from '../../assets/commentIcon.png';
import compose from '../../assets/compose.png';
import * as CSS from '../../style/globalStyle';
import WriteComment from './WriteComment';
import api from '../../api/axios';
import CommentItem from './CommentItem';
import ModalPortal from '../../shared/ModalPortal';
import LoginSnackBar from '../login/LoginSnackBar';

const Comment = ({ storeId }) => {
  const [modal, setModal] = useState(false);
  const token = Cookies.get('accesstoken');

  const CommentAddModalOpenHandler = () => {
    setModal(!modal);
  };

  const getCommentHandler = async () => {
    const response = await api.get(`/api/comment/${storeId}`);

    return response;
  };

  const { data, isLoading } = useQuery(
    ['getComment', storeId],
    getCommentHandler
  );

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
                check={item.check}
              />
            );
          })}
      </CommentListArticle>
      <ButtonBoxDiv>
        <CSS.CommentAddButton size="360px" onClick={CommentAddModalOpenHandler}>
          <CSS.ComposeImg src={compose} art="" />
          <span>소중한 후기를 남겨주세요.</span>
        </CSS.CommentAddButton>
        {token === undefined && modal && (
          <ModalPortal>
            <LoginSnackBar type="authorization" />
          </ModalPortal>
        )}
        {token !== undefined && modal && (
          <WriteComment modal={modal} setModal={setModal} storeId={storeId} />
        )}
      </ButtonBoxDiv>
    </CommentBoxSection>
  );
};

export default Comment;

const CommentBoxSection = styled.section`
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
