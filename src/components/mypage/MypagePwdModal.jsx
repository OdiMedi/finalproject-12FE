import { useState } from 'react';
import styled from 'styled-components';
import NicknameX from '../../assets/nicknameX.png';
import api from '../../api/axios';

const MypagePwdModal = ({ onAccess }) => {
  const [pwdInput, setPwdInput] = useState('');
  const [pwdSameInput, setPwdSameInput] = useState('');
  const [pwdCheck, setPwdCheck] = useState(true);
  const [pwdSameCheck, setPwdSameCheck] = useState(false);
  const [pwdSameHelper, setPwdSameHelper] = useState(true);
  const pwdOnChange = e => {
    const { value } = e.target;
    const passwordRegExp = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,15}$/;
    setPwdInput(value);
    if (!passwordRegExp.test(value)) {
      setPwdCheck(false);
    } else {
      setPwdCheck(true);
    }
  };
  const pwdSameOnChange = e => {
    const { value } = e.target;
    setPwdSameInput(value);
    setPwdSameHelper(true);
  };

  const editPasswordHandle = async () => {
    if (pwdInput === pwdSameInput) {
      setPwdSameCheck(true);
    } else {
      setPwdSameCheck(false);
    }
    if (pwdSameCheck === false) {
      setPwdSameHelper(false);
      return;
    }
    try {
      await api.post('/user/change/password', { newPassword: pwdInput });
    } catch (error) {
      console.log(error);
    }
    onAccess(true);
  };
  return (
    <NickNameModalWrapDiv>
      <NicknameUpdataDiv>
        <NicknameTitleP>비밀번호 변경</NicknameTitleP>
        <NicknameXDiv onClick={() => onAccess(true)} />
        <NicknameInputWrapDiv>
          <NicknameInput
            placeholder="변경하실 비밀번호를 입력해주세요"
            name="password"
            value={pwdInput}
            onChange={pwdOnChange}
            type="password"
          />
          {!pwdCheck && (
            <HelperTextP>
              영어(대소문자 구분), 숫자로 8~15자로 입력해주세요
            </HelperTextP>
          )}
          <NicknameInput
            value={pwdSameInput}
            placeholder="다시 한번 입력해주세요"
            type="password"
            onChange={pwdSameOnChange}
          />
          {!pwdSameHelper && (
            <HelperTextP>비밀번호가 일치하지 않습니다</HelperTextP>
          )}
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
  height: 385px;
  background: #ffffff;
  border-radius: 30px;
  position: relative;
`;
const NicknameTitleP = styled.p`
  font-weight: 800;
  font-size: 18px;
  line-height: 34px;
  position: absolute;
  top: 49px;
  left: 217px;
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
  /* gap: 25px; */
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
  margin-top: 15px;
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
  top: 282px;
  left: 92px;
`;

const HelperTextP = styled.p`
  color: #fa5938;
  margin-top: 5px;
  font-size: 13px;
`;
