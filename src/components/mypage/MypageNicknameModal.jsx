import { useState } from 'react';
import styled from 'styled-components';
import api from '../../api/axios';
import NicknameX from '../../assets/nicknameX.png';

const MypageNicknameModal = ({ onAccess }) => {
  const [nickInput, setNickInput] = useState('');
  const [alertError, setAlertError] = useState(false);
  const nickInputChange = e => {
    setNickInput(e.target.value);
  };
  const updateNickBtn = async () => {
    try {
      await api.post(`user/change/nickname`, { newName: nickInput });
    } catch (error) {
      console.log('updateError:::::', error);
      setAlertError(true);
      return;
    }
    onAccess(false);
    setAlertError(false);
  };
  return (
    <NickNameModalWrapDiv>
      <NicknameUpdataDiv>
        <NicknameTitleP>닉네임 변경</NicknameTitleP>
        <NicknameXDiv onClick={() => onAccess(true)} />
        <NicknameInput onChange={nickInputChange} value={nickInput} />
        <NicknameButton onClick={updateNickBtn}>변경하기</NicknameButton>
        {alertError && (
          <ErrorAlertP>
            중복된 닉네임이 존재합니다. 다른 닉네임을 입력해주세요
          </ErrorAlertP>
        )}
      </NicknameUpdataDiv>
    </NickNameModalWrapDiv>
  );
};

export default MypageNicknameModal;

const NickNameModalWrapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const NicknameUpdataDiv = styled.div`
  width: 540px;
  height: 245px;
  background: #ffffff;
  border-radius: 30px;
  position: relative;
`;
const NicknameTitleP = styled.p`
  font-weight: 800;
  font-size: 18px;
  line-height: 34px;
  position: absolute;
  top: 29px;
  left: 227px;
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

const NicknameInput = styled.input`
  background: #ededed;
  border-radius: 10px;
  width: 462px;
  height: 39px;
  border: none;
  outline: none;
  position: absolute;
  top: 83px;
  left: 39px;
`;

const NicknameButton = styled.button`
  background: #fa5938;
  border-radius: 32px;
  width: 360px;
  height: 40px;
  border: none;
  position: absolute;
  top: 142px;
  left: 92px;
`;
const ErrorAlertP = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 32px;
  position: absolute;
  top: 196px;
  left: 131px;
  color: red;
`;
