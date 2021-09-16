import { AppContext } from '../context/store-context';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import Nav from 'react-bootstrap/Nav';

const Navigation = ({ setShowCardModal }) => {
  const { setMetaUpdate } = useContext(AppContext);

  return (
    <>
      <Container>
        <Navbar
          color='light'
          light
          expand='md'
          className='justify-content-center'
        >
          <Navbar.Brand href='/'>
            <strong>React-card-board</strong>
          </Navbar.Brand>
          <Nav className='justify-content-between'>
            <NavItem>
              <Button
                variant='secondary'
                style={{ margin: '0px 5px' }}
                onClick={() => {
                  setMetaUpdate();
                  setShowCardModal(true);
                }}
              >
                Add Card
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </Container>
    </>
  );
};

export default Navigation;
