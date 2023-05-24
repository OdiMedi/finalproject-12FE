import styled from 'styled-components';
import Header from './components/Header';
import Router from './shared/Router';

const App = () => {
  return (
    <AllSize>
      <Header />
      <Router />
    </AllSize>
  );
};

export default App;

const AllSize = styled.div`
  width: 1920px;
`;
