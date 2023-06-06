import { useState } from 'react';
import styled from 'styled-components';
import api from '../../api/axios';
import NicknameX from '../../assets/nicknameX.png';
import FindPwdIcon from '../../assets/findPwdIcon.png';

const FindPasswordModal = () => {
  return (
    <PwdModalWrapDiv>
      <PwdFindDiv>
        <PwdTitleP>비밀번호 찾기</PwdTitleP>
        <PwdXDiv />
        <PwdInput placeholder="가입 시 입력한 이메일을 입력해주세요." />
        <PwdButton>
          <div />
          <span>비밀번호 보내기</span>
        </PwdButton>
        <HelperTextP>
          이메일 입력 시, 이메일로 임시 비밀번호가 전송됩니다.
        </HelperTextP>
        <ErrorAlertP>이메일이 존재하지 않습니다</ErrorAlertP>
      </PwdFindDiv>
    </PwdModalWrapDiv>
  );
};

export default FindPasswordModal;

const PwdModalWrapDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const PwdFindDiv = styled.div`
  width: 540px;
  height: 245px;
  background: #ffffff;
  border-radius: 30px;
  position: relative;
`;
const PwdTitleP = styled.p`
  font-weight: 800;
  font-size: 18px;
  line-height: 34px;
  position: absolute;
  top: 29px;
  left: 220px;
`;

const PwdXDiv = styled.div`
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

const PwdInput = styled.input`
  background: #ededed;
  border-radius: 10px;
  width: 462px;
  height: 39px;
  border: none;
  outline: none;
  position: absolute;
  top: 83px;
  left: 39px;

  &::placeholder {
    text-indent: 19px;
    font-size: 15px;
    font-weight: 400;
    color: #949494;
  }
`;

const PwdButton = styled.button`
  background: #fa5938;
  border-radius: 32px;
  width: 360px;
  height: 40px;
  border: none;
  position: absolute;
  top: 142px;
  left: 92px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  div {
    width: 15px;
    height: 16px;
    background-image: url(${FindPwdIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  span {
    font-weight: 900;
    font-size: 15px;
    line-height: 34px;
    letter-spacing: -0.5px;
    color: #ffffff;
  }
`;
const HelperTextP = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 32px;
  letter-spacing: -0.5px;
  color: #949494;
  position: absolute;
  top: 186px;
  left: 151px;
`;

const ErrorAlertP = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 32px;
  position: absolute;
  top: 206px;
  left: 201px;
  color: red;
`;
