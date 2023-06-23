import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import commentIcon from '../../assets/commentIcon.png';
import compose from '../../assets/compose.png';
import * as CSS from '../../style/globalStyle';

import ModalPortal from '../../shared/ModalPortal';
import CommentItem from './CommentItem';
import WriteComment from './WriteComment';

import { getComment } from '../../api/comment';
import SnackBar from '../SnackBar';

const Comment = ({ storeId, location, totalCommentsNum }) => {
  const [modal, setModal] = useState(false);
  const [mainPageLocation, setMainPageLocation] = useState(false);
  const token = Cookies.get('accesstoken');

  useEffect(() => {
    if (location === 'mainPage') {
      setMainPageLocation(true);
    }
  }, []);
  const CommentAddModalOpenHandler = () => {
    setModal(!modal);
  };
  const { data, isLoading } = useQuery(['getComment', storeId], () =>
    getComment(storeId)
  );
  return (
    <CommentBoxSection>
      <CSS.CommentInfoDiv>
        <CSS.CommentIconImg src={commentIcon} alt="" />
        <span>
          {mainPageLocation
            ? `이용후기 ${totalCommentsNum}개`
            : `${totalCommentsNum} comments`}
        </span>
      </CSS.CommentInfoDiv>
      <CommentListArticle>
        {!isLoading &&
          data?.map(item => {
            return (
              <CommentItem
                key={item.commentId}
                storeId={storeId}
                commentId={item.commentId}
                nickname={item.nickname}
                contents={item.contents}
                check={item.check}
                imageUrl={item.imageUrl}
              />
            );
          })}
      </CommentListArticle>
      <ButtonBoxDiv>
        <CSS.CommentAddButton size="360px" onClick={CommentAddModalOpenHandler}>
          <CSS.ComposeImg src={compose} art="" />
          <span>
            {mainPageLocation
              ? '소중한 후기를 남겨주세요.'
              : 'Please leave a valuable review.'}
          </span>
        </CSS.CommentAddButton>
        {token === undefined && modal && (
          <ModalPortal>
            <SnackBar type="login" />
          </ModalPortal>
        )}
        {token !== undefined && modal && (
          <ModalPortal>
            <WriteComment
              mainPageLocation={mainPageLocation}
              onAccess={CommentAddModalOpenHandler}
              storeId={storeId}
            />
          </ModalPortal>
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
  border-bottom: 1px solid #dadada;

  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    /* width: 10px; */
    height: 50%;
    background-color: #dadada;
    border-radius: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #dadada;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    background-clip: padding-box;
  }
`;
const ButtonBoxDiv = styled.div`
  display: flex;
  justify-content: center;
`;
