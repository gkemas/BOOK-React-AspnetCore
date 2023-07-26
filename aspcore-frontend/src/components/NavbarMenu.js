import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavbarMenu = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Gökhan Kemaş</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={() => handleLanguageChange('en')}>EN</Nav.Link>
              <Nav.Link onClick={() => handleLanguageChange('tr')}>TR</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarMenu;

