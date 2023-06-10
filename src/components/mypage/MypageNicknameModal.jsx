import { useState } from 'react';
import styled from 'styled-components';
import api from '../../api/axios';
import NicknameX from '../../assets/nicknameX.png';

const MypageNicknameModal = ({ onAccess }) => {
  const [nickInput, setNickInput] = useState('');
  const [alertError, setAlertError] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(true);

  const nickInputChange = e => {
    const { value } = e.target;
    setNickInput(value);
    const nicknameRegExp = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,10}$/;
    if (!nicknameRegExp.test(value)) {
      setNicknameCheck(false);
    } else {
      setNicknameCheck(true);
    }
  };
  const updateNickBtn = async () => {
    if (!nicknameCheck) {
      return;
    }
    try {
      const response = await api.post(`user/change/nickname`, {
        newName: nickInput,
      });
      localStorage.setItem('nickname', response.data.nickname);
    } catch (error) {
      console.log('updateError:::::', error);
      setAlertError(true);
      return;
    }
    onAccess(true);
    setAlertError(false);
  };
  return (
    <NickNameModalWrapDiv>
      <NicknameUpdataDiv>
        <NicknameTitleP>닉네임 변경</NicknameTitleP>
        <NicknameXDiv onClick={() => onAccess(true)} />
        <NickInputTextSpan>닉네임</NickInputTextSpan>
        <NicknameInput onChange={nickInputChange} value={nickInput} />
        {!nicknameCheck && (
          <HelperTextP>
            닉네임은 한글, 영어(대소문자 구분), 숫자로 2~10자로 입력해주세요
          </HelperTextP>
        )}
        <NicknameButton onClick={updateNickBtn}>
          회원정보 수정하기
        </NicknameButton>
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

const NickInputTextSpan = styled.span`
  font-weight: 600;
  font-size: 13px;
  line-height: 34px;
  position: absolute;
  left: 110px;
  top: 93px;
`;

const NicknameInput = styled.input`
  background: #ffffff;
  border: 1.5px solid #d9d9d9;
  border-radius: 5px;
  width: 265px;
  height: 34px;
  outline: none;
  position: absolute;
  top: 93px;
  left: 164px;
`;

const NicknameButton = styled.button`
  background: #fa5938;
  border-radius: 32px;
  width: 360px;
  height: 40px;
  border: none;
  position: absolute;
  top: 172px;
  left: 92px;
  font-weight: 900;
  font-size: 15px;
  line-height: 34px;
  color: #ffffff;
`;
const ErrorAlertP = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 32px;
  position: absolute;
  top: 206px;
  left: 131px;
  color: red;
`;
const HelperTextP = styled.p`
  color: #fa5938;
  position: absolute;
  font-size: 13px;
  top: 140px;
  left: 90px;
`;
