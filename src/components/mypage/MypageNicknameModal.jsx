import { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import api from '../../api/axios';
import { updateNickBtn } from '../../api/myPage';
import NicknameX from '../../assets/nicknameX.png';

const MypageNicknameModal = ({ onAccess, nickName }) => {
  const [nickInput, setNickInput] = useState('');
  const [alertError, setAlertError] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState(true);

  const mutation = useMutation(updateNickBtn, {
    onSuccess: () => {
      onAccess(true);
      setAlertError(false);
    },
    onError: () => {
      setAlertError(true);
    },
  });
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
  const nickNameChangeHandler = () => {
    if (nicknameCheck) {
      mutation.mutate(nickInput);
    }
  };
  return (
    <NickNameModalWrapDiv>
      <NicknameUpdataDiv>
        <NicknameTitleP>닉네임 변경</NicknameTitleP>
        <NicknameXDiv onClick={() => onAccess(false)} />
        <div>
          닉네임
          <NicknameInput
            onChange={nickInputChange}
            value={nickInput}
            placeholder={nickName}
          />
        </div>
        <HelperTextP>
          {!nicknameCheck &&
            '닉네임은 한글, 영어(대소문자 구분), 숫자로 2~10자로 입력해주세요'}
        </HelperTextP>
        <NicknameButton onClick={nickNameChangeHandler}>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;
const NicknameTitleP = styled.p`
  font-weight: 800;
  font-size: 18px;
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
  cursor: pointer;
`;

const NicknameInput = styled.input`
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
  margin-top: 15px;
  font-weight: 900;
  font-size: 15px;
  line-height: 34px;
  color: #ffffff;
`;
const ErrorAlertP = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 32px;
  color: #fa5938;
`;
const HelperTextP = styled.p`
  color: #fa5938;
  font-size: 13px;
`;
