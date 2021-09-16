import { FontAwesome } from 'react-fontawesome';
import { AppContext } from '../context/store-context';
import { useContext } from 'react';
import {
  Container,
  Button,
  Navbar,
  NavItem,
  Nav,
  NavbarBrand,
} from 'react-bootstrap';


const NavBar = ({ setShowCardModal }) => {
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
          <NavbarBrand href='/'>
            <strong>React-card-board</strong>
          </NavbarBrand>

          <Nav className='mr-auto' navbar>
            <NavItem>
              <Button
                variant='primary'
                style={{ margin: '0px 5px' }}
                onClick={() => {
                  setMetaUpdate();
                  setShowCardModal(true);
                }}
              >
                Add Card
                <FontAwesome icon='fa-plus' />
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
      </Container>
    </>
  );
};

export default NavBar;
