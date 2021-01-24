import { ApolloProvider } from 'react-apollo';
import Missions from './pages/Missions';
import ApolloClient from './services/apollo';
import { Container } from 'reactstrap';
function App() {
  return (
    <>
      <ApolloProvider client={ApolloClient}>
        <Container className=' text-center'>
          <h1 className='mt-5'>SpaceX Missions</h1>
          <Missions />
        </Container>
      </ApolloProvider>
    </>
  );
}

export default App;
