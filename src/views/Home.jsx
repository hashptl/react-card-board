import ContainerBox from '../components/container-box';
import CardModal from '../components/card-modal';
import Navigation from '../components/nav-bar';
import { AppContext } from '../context/store-context';
import { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Home = () => {
  const { setShowCardModal } = useContext(AppContext);
  return (
    <>
      <Navigation setShowCardModal={setShowCardModal} />
      <Container fluid style={{ padding: '30px 50px' }}>
        <Row xs={1} md={2} lg={3} style={{ justifyContent: 'center' }}>
          <Col>
            <ContainerBox title='Plan' />
          </Col>
          <Col>
            <ContainerBox title='Process' />
          </Col>
          <Col>
            <ContainerBox title='Complete' />
          </Col>
        </Row>
      </Container>
      <CardModal />
    </>
  );
};

export default Home;
