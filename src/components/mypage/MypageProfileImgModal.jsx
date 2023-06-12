import styled from 'styled-components';
import { useState } from 'react';
import NicknameX from '../../assets/nicknameX.png';
import UserUpdateBtn from '../../assets/userUpdateBtn.png';
import ProfileDefault from '../../assets/profileImgDefault.png';
import ProfileImgUpload from '../../assets/profileImgUpload.png';
import api from '../../api/axios';

const MypageProfileImgModal = ({ onAccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      onAccess(true);
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await api.post('/user/change/profile', formData);
    } catch (error) {
      console.log('profileImgError::::::', error);
    }
  };

  return (
    <ProfileImgContainerDiv>
      <ProfileImgWrapDiv>
        <ProfileTitleP>프로필 사진 변경</ProfileTitleP>
        <ProfileXDiv onClick={() => onAccess(true)} />
        {previewImage ? (
          <FileImg src={previewImage} alt="preview" />
        ) : (
          <ProfileImgDiv />
        )}
        {/* <ProfileUploadDiv /> */}
        <ProfileUploadLabel htmlFor="fileInput">
          첨부파일 업로드
        </ProfileUploadLabel>
        <ProfileUploadInput
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
        />
        <ProfileTextP>변경할 사진을 업로드 해주세요</ProfileTextP>
        <ProfileImgSubmitDiv onClick={handleFileUpload} />
      </ProfileImgWrapDiv>
    </ProfileImgContainerDiv>
  );
};

export default MypageProfileImgModal;

const ProfileImgContainerDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const ProfileImgWrapDiv = styled.div`
  width: 510px;
  height: 531px;
  background: #ffffff;
  border-radius: 30px;
  position: relative;
`;
const ProfileTextP = styled.p`
  font-weight: 500;
  font-size: 10px;
  line-height: 34px;
  color: #686868;
  position: absolute;
  top: 372px;
  left: 188px;
`;
const ProfileTitleP = styled.p`
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 34px;
  position: absolute;
  top: 35px;
  left: 170px;
`;
const ProfileXDiv = styled.div`
  width: 18px;
  height: 18px;
  background-image: url(${NicknameX});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 23px;
  right: 27px;
`;
const ProfileImgDiv = styled.div`
  width: 210px;
  height: 210px;
  background-image: url(${ProfileDefault});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 124px;
  left: 151px;
`;
const FileImg = styled.img`
  width: 210px;
  height: 210px;
  position: absolute;
  top: 124px;
  left: 151px;
`;
const ProfileUploadDiv = styled.div`
  width: 210px;
  height: 30px;
  background-image: url(${ProfileImgUpload});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 242px;
  left: 150px;
`;
const ProfileUploadLabel = styled.label`
  width: 210px;
  height: 30px;
  position: absolute;
  top: 342px;
  left: 150px;
  text-align: center;
  background: #fafafa;
  border: 0.5px solid #afaeb7;
  border-radius: 20px;
  color: #686868;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileUploadInput = styled.input`
  display: none;
`;
const ProfileImgSubmitDiv = styled.div`
  width: 360px;
  height: 40px;
  background-image: url(${UserUpdateBtn});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 455px;
  left: 75px;
`;
