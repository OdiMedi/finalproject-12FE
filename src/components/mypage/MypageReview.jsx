import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import mypageIcon from '../../assets/mypageIcon.png';
import profileIcon from '../../assets/profile.png';
import ThumbUp from '../../assets/thumbup.png';
import ThumbDown from '../../assets/thumbdown.png';
import Ellipsis from '../../assets/ellipsis.png';
import DeleteIcon from '../../assets/trashIcon.png';
import api from '../../api/axios';

const MypageReview = ({ storeId, nickname, contents, commentId }) => {
  const queryClient = useQueryClient();

  const mypageCommentDelMutaion = useMutation(
    () => api.delete(`/api/comment/${storeId}/${commentId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getReview');
      },
    }
  );
  const deleteMypageComment = () => {
    mypageCommentDelMutaion.mutate();
  };

  const getPharmacyData = async () => {
    const response = await api.get(`api/store/${storeId}`);
    return response;
  };

  const { data } = useQuery('getPharData', getPharmacyData);

  return (
    <MypageReviewDiv>
      <DeleteDiv onClick={deleteMypageComment} />
      <MypagePharDiv>
        <MypagePharNameDiv>
          <div />
          <span>{data?.data.name}</span>
        </MypagePharNameDiv>
        <MypagePharInfoDiv>
          <p>{data?.data.callNumber}</p>
          <p>{data?.data.address}</p>
          <p>{data?.data.weekdaysTime}</p>
        </MypagePharInfoDiv>
      </MypagePharDiv>
      <MypageReviewTextDiv>
        <ReveiwProfileDiv />
        <ReviewTextDiv>
          <p className="reviewName">{nickname}</p>
          <p className="reviewText">{contents}</p>
          <ReviewTextIconDiv>
            <ThubmUpDiv />
            <span>100</span>
            <ThubmDownDiv />
            <span>1</span>
            <EllipsispDiv />
          </ReviewTextIconDiv>
        </ReviewTextDiv>
      </MypageReviewTextDiv>
    </MypageReviewDiv>
  );
};

export default MypageReview;

const MypageReviewDiv = styled.div`
  width: 100%;
  background-color: rgba(245, 245, 245, 0.7);
  border-radius: 15px;
  padding: 9px 0px 11px 17px;
  margin-top: 18px;
  display: flex;
  align-items: center;
  position: relative;
`;
const MypagePharDiv = styled.div`
  width: 40%;
  display: flex;
`;
const MypagePharNameDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 31px;

  div {
    width: 30px;
    height: 30px;
    background-image: url(${mypageIcon});
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 10px;
  }
  span {
    font-weight: 800;
    font-size: 20px;
    line-height: 34px;
    letter-spacing: -0.5px;
  }
`;
const MypagePharInfoDiv = styled.div`
  p {
    font-weight: 600;
    font-size: 12px;
    line-height: 34px;
    letter-spacing: -0.5px;
  }
`;
const MypageReviewTextDiv = styled.div`
  width: 55%;
  display: flex;
  align-items: center;
`;
const ReveiwProfileDiv = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${profileIcon});
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 16px;
`;
const ReviewTextDiv = styled.div`
  width: 80%;
  .reviewName {
    font-weight: 800;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }
  .reviewText {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    margin-bottom: 9px;
    word-wrap: break-word;
  }
`;
const ReviewTextIconDiv = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: 0.05em;
    color: #686868;
  }
`;
const ThubmUpDiv = styled.div`
  width: 16px;
  height: 16px;
  background-image: url(${ThumbUp});
  background-size: 16px 16px;
  margin-right: 6.5px;
`;
const ThubmDownDiv = styled.div`
  width: 16px;
  height: 16px;
  background-image: url(${ThumbDown});
  background-size: 16px 16px;
  margin-left: 26px;
  margin-right: 6px;
`;
const EllipsispDiv = styled.div`
  width: 16.5px;
  height: 3px;
  background-image: url(${Ellipsis});
  background-size: 16.5px 3px;
  margin-left: 26px;
`;
const DeleteDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 19px;
  width: 15px;
  height: 17.5px;
  background-image: url(${DeleteIcon});
  background-size: contain;
  background-repeat: no-repeat;
`;
