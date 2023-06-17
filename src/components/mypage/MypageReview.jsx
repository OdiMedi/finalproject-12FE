import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../assets/profile.png';
import DeleteIcon from '../../assets/trashIcon.png';
import api from '../../api/axios';
import mypageIcon from '../../assets/mypageIcon.png';
import ModalPortal from '../../shared/ModalPortal';
import CommentDelModal from '../comment/CommentDelModal';

const MypageReview = ({
  storeId,
  nickname,
  contents,
  commentId,
  storeName,
  address,
  callNumber,
  weekday,
  foreign,
  imageUrl,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mypageCommentDelMutaion = useMutation(
    () => api.delete(`/api/comment/${storeId}/${commentId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getReview');
      },
    }
  );

  const handleDelCheck = newValue => {
    if (newValue === true) {
      mypageCommentDelMutaion.mutate();
      setModalVisible(false);
    } else if (newValue === false) {
      setModalVisible(false);
    }
  };
  const reviewDelBtnHandle = event => {
    event.stopPropagation();
    setModalVisible(true);
  };

  const reviewDetailPage = () => {
    if (foreign === false) {
      navigate(`/mainPage/${storeId}`);
    } else if (foreign === true) {
      navigate(`/foreignPage/${storeId}`);
    }
  };

  return (
    <MypageReviewDiv onClick={reviewDetailPage}>
      {modalVisible && (
        <ModalPortal>
          <CommentDelModal onAccess={handleDelCheck} />
        </ModalPortal>
      )}
      <DeleteDiv onClick={reviewDelBtnHandle} />
      <MypagePharDiv>
        <MypagePharNameDiv>
          <div />
          <span>{storeName}</span>
        </MypagePharNameDiv>
        <MypagePharInfoDiv>
          <p>{callNumber}</p>
          <p>{address.split(',')[0].split('(')[0]}</p>
          <p>{weekday}</p>
        </MypagePharInfoDiv>
      </MypagePharDiv>
      <MypageReviewTextDiv>
        {imageUrl === '' ? (
          <ReviewProfileDiv />
        ) : (
          <ReviewProfileImg src={imageUrl} art="profileImage" />
        )}
        <ReviewTextDiv>
          <ReviewNameP>{nickname}</ReviewNameP>
          <ReviewTextP>{contents}</ReviewTextP>
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
  cursor: pointer;
  &:hover {
    box-shadow: 3px 3px 2px rgba(175, 174, 183, 0.5);
    transform: scale(1.02);
  }
`;

const MypageReviewTextDiv = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  border-radius: 50%;
`;
const ReviewProfileDiv = styled.div`
  width: 54px;
  height: 54px;
  background-image: url(${profileIcon});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 16px;
`;
const ReviewProfileImg = styled.img`
  width: 54px;
  height: 54px;
  margin-right: 16px;
`;
const ReviewTextDiv = styled.div`
  width: 560px;
  display: flex;
  flex-direction: column;
`;
const ReviewNameP = styled.p`
  font-weight: 800;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;
const ReviewTextP = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.05em;
  margin-bottom: 9px;
  word-wrap: break-word;
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
  cursor: pointer;
`;
const MypagePharDiv = styled.div`
  display: flex;
  margin-right: 20px;
`;
const MypagePharNameDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 31px;
  width: 190px;
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
    font-size: 17px;
    line-height: 34px;
    letter-spacing: -0.5px;
  }
`;
const MypagePharInfoDiv = styled.div`
  width: 300px;
  p {
    font-weight: 600;
    font-size: 12px;
    line-height: 34px;
    letter-spacing: -0.5px;
  }
`;
