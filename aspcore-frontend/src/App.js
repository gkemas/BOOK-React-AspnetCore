// import 'bootstrap/dist/css/bootstrap.min.css';
// import BookStore from "./components/BookStore";

// function App() {
//   return (
//     <div>
//    <BookStore/>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n'; // i18n.js dosyanızın yolunu doğru şekilde verin
import NavbarMenu from './components/NavbarMenu';
import BookStore from './components/BookStore';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <div>
        <NavbarMenu />
        <BookStore />
      </div>
    </I18nextProvider>
  );
}

export default App;
