import styled from 'styled-components';
import profileImg from '../../assets/profile.png';
import recommentIcon from '../../assets/recommentIcon.png';

const CommentItem = props => {
  const { id, nickname, content, recommentLength } = props;
  return (
    <CommentItemContainerDiv>
      <ProfileWrapDiv>
        <CommentProfileDiv />
      </ProfileWrapDiv>
      <CommentTextDiv>
        <CommentNicknameP>{nickname}</CommentNicknameP>
        <CommentContentP>{content}</CommentContentP>
        <RecommentWrapDiv>
          <RecommentIconDiv />
          <RecommnetTotalP>{recommentLength}</RecommnetTotalP>
        </RecommentWrapDiv>
      </CommentTextDiv>
    </CommentItemContainerDiv>
  );
};

export default CommentItem;

const CommentItemContainerDiv = styled.div`
  width: 100%;
  height: 76px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #dadada;
`;
const ProfileWrapDiv = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
`;
const CommentProfileDiv = styled.div`
  width: 46px;
  height: 46px;
  background-image: url(${profileImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-right: 34px;
`;
const CommentTextDiv = styled.div`
  margin-top: 11px;
  width: 460px;
  /* height: 58px; */
`;
const CommentNicknameP = styled.p`
  font-weight: 800;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;
const CommentContentP = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.05em;
  margin-bottom: 7px;
`;
const RecommentWrapDiv = styled.div`
  display: flex;
  margin-bottom: 9px;
`;
const RecommentIconDiv = styled.div`
  width: 10px;
  height: 10px;
  background-image: url(${recommentIcon});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const RecommnetTotalP = styled.p`
  font-weight: 600;
  font-size: 8px;
  line-height: 11px;
  letter-spacing: 0.05em;
  color: #686868;
  margin-left: 5px;
`;
