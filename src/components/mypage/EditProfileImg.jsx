import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { editProfileImg } from '../../api/myPage';
import editImgIcon from '../../assets/editImgIcon.png';
import NicknameX from '../../assets/nicknameX.png';

const EditProfileImg = ({ onAccess }) => {
  const [fileImage, setFileImage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const mutation = useMutation(editProfileImg, {
    onSuccess: data => {
      setProfileImage(data.file);
      onAccess(true);
    },
    onError: error => {
      console.log(error);
    },
  });

  const formData = new FormData();
  formData.append('file', fileImage);

  const saveFileImage = e => {
    setFileImage(e.target.files[0]);
    const previewURL = window.URL.createObjectURL(e.target.files[0]);
    setProfileImage(previewURL);
  };
  const profileImgEditButtonHandler = () => {
    mutation.mutate(formData);
  };
  return (
    <NickNameModalWrapDiv>
      <NicknameUpdataDiv>
        <NicknameXDiv onClick={() => onAccess(true)} />
        <NicknameTitleP>프로필 사진 변경</NicknameTitleP>
        {!profileImage && <EditImgBoxDiv img={null} />}
        {profileImage && <EditImg src={profileImage} art="profileImage" />}
        <FiledInputWrapperForm
          onSubmit={e => e.preventDefault()}
          method="post"
          encType="multipart/form-data"
        >
          <ImgUploadButton>
            <FiledInput type="file" onChange={saveFileImage} />
            프로필 사진 업로드
          </ImgUploadButton>
        </FiledInputWrapperForm>
        <UploadInfoP>변경할 사진을 업로드 해주세요!</UploadInfoP>
        <NicknameButton onClick={profileImgEditButtonHandler}>
          회원정보 수정하기
        </NicknameButton>
      </NicknameUpdataDiv>
    </NickNameModalWrapDiv>
  );
};

export default EditProfileImg;
const NickNameModalWrapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const NicknameUpdataDiv = styled.div`
  width: 510px;
  height: 531px;
  background: #ffffff;
  border-radius: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;
const NicknameTitleP = styled.p`
  font-weight: 800;
  font-size: 24px;
  line-height: 34px;
`;

const NicknameXDiv = styled.div`
  width: 18px;
  height: 18px;
  background-image: url(${NicknameX});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 17px;
  right: 21px;
`;

const EditImgBoxDiv = styled.div`
  background-image: url(${editImgIcon});
  background-size: 215px 215px;
  background-repeat: no-repeat;
  background-position: center;
  width: 201px;
  height: 201px;
  margin-top: 50px;
  border-radius: 50%;
  border: ${props => (props.img === null ? '3px solid #d9d9d9' : 'none')};
`;
const EditImg = styled.img`
  width: 201px;
  height: 201px;
  margin-top: 50px;
  border-radius: 50%;
`;
const FiledInputWrapperForm = styled.div`
  position: relative;
`;

const FiledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const UploadInfoP = styled.p`
  font-weight: 500;
  font-size: 10px;
  line-height: 34px;
  color: #686868;
`;
const ImgUploadButton = styled.button`
  background-color: transparent;
  border: 1.5px solid #d9d9d9;
  border-radius: 5px;
  margin-left: 20px;
  margin-top: 25px;
  margin-bottom: 15px;
  padding-left: 10px;
  width: 255px;
  height: 34px;
  font-weight: 600;
  font-size: 13px;
  line-height: 34px;
  outline: none;
`;

const NicknameButton = styled.button`
  background: #fa5938;
  border-radius: 32px;
  width: 360px;
  height: 40px;
  border: none;
  margin-top: 30px;
  font-weight: 900;
  font-size: 15px;
  line-height: 34px;
  color: #ffffff;
`;
