import React, { useState } from 'react';
import styled from 'styled-components';
import NicknameX from '../../assets/nicknameX.png';
import api from '../../api/axios';

const MypagePwdModal = ({ onAccess }) => {
  const [pwdInput, setPwdInput] = useState('');
  const pwdOnChange = e => {
    setPwdInput(e.target.value);
  };
  const editPasswordHandle = async () => {
    try {
      await api.post('/user/change/password', { newPassword: pwdInput });
    } catch (error) {
      console.log(error);
    }
    onAccess(false);
  };
  return (
    <NickNameModalWrapDiv>
      <NicknameUpdataDiv>
        <NicknameTitleP>비밀번호 변경</NicknameTitleP>
        <NicknameXDiv onClick={() => onAccess(true)} />
        <NicknameInputWrapDiv>
          <NicknameInput
            placeholder="변경하실 비밀번호를 입력해주세요"
            value={pwdInput}
            onChange={pwdOnChange}
          />
          <NicknameInput placeholder="다시 한번 입력해주세요" />
        </NicknameInputWrapDiv>

        <NicknameButton onClick={editPasswordHandle}>변경하기</NicknameButton>
      </NicknameUpdataDiv>
    </NickNameModalWrapDiv>
  );
};

export default MypagePwdModal;

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
  height: 345px;
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

const NicknameInputWrapDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: absolute;
  left: 40px;
  top: 100px;
`;

const NicknameInput = styled.input`
  background: #ededed;
  border-radius: 10px;
  width: 462px;
  height: 39px;
  border: none;
  outline: none;
  text-indent: 20px;
  /* position: absolute;
  top: 83px;
  left: 39px; */
`;

const NicknameButton = styled.button`
  background: #fa5938;
  border-radius: 32px;
  width: 360px;
  height: 40px;
  border: none;
  position: absolute;
  top: 242px;
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
