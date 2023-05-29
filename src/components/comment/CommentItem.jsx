import styled from 'styled-components';
import profileImg from '../../assets/profile.png';
import recommentIcon from '../../assets/recommentIcon.png';

const CommentItem = () => {
  return (
    <CommentItemContainerDiv>
      <CommentProfileDiv />
      <CommentTextDiv>
        <CommentNicknameP>David</CommentNicknameP>
        <CommentContentP>
          약 조제가 빨라 좋네요! 우리 아이 병원 진료 후에는 항상 행복 약국으로
          갑니다. 약 조제가 빨라 좋네요! 우리 아이 병원 진료 후에는 항상 행복
          약국으로 갑니다.
        </CommentContentP>
        <RecommnetWrapDiv>
          <RecommentIconDiv />
          <RecommnetTotalP>100</RecommnetTotalP>
        </RecommnetWrapDiv>
      </CommentTextDiv>
    </CommentItemContainerDiv>
  );
};

export default CommentItem;

const CommentItemContainerDiv = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  margin-left: 20px;
  /* align-items: center;
  justify-content: center; */
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
  width: 460px;
  height: 58px;
`;
const CommentNicknameP = styled.p`
  font-weight: 800;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.05em;
`;
const CommentContentP = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.05em;
`;
const RecommnetWrapDiv = styled.div`
  display: flex;
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
`;
