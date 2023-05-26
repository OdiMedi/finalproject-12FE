import React from 'react';
import styled from 'styled-components';
import commentIcon from '../../assets/commentIcon.png';

const Comment = () => {
  return (
    <CommentBoxSection>
      <CommentIcon src={commentIcon} alt="" />
      이용 후기
    </CommentBoxSection>
  );
};

export default Comment;

const CommentBoxSection = styled.section`
  margin-top: 30px;
  width: 610px;
  height: 388px;
  font-size: 18px;
  background-color: yellow;
  display: flex;
`;
const CommentIcon = styled.img`
  width: 20px;
  height: 18px;
  margin-left: 15px;
  margin-right: 9px;
`;
