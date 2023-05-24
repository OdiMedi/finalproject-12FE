import { useState } from 'react';

const SignupModal = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    nickname: '',
    password: '',
  });
  const { email, nickname, password } = inputValue;
  const inputChange = e => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const submitSignup = () => {};
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '560px',
        height: '620px',
        margin: '0 auto',
        border: '1px solid black',
      }}
    >
      <input name="email" value={email} onChange={inputChange} type="text" />
      <input
        name="nickname"
        value={nickname}
        onChange={inputChange}
        type="text"
      />
      <input
        name="password"
        value={password}
        onChange={inputChange}
        type="password"
      />
      <button type="button" onClick={submitSignup}>
        Sign up
      </button>
    </div>
  );
};

export default SignupModal;
