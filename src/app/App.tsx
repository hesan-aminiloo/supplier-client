/* eslint-disable react-hooks/exhaustive-deps */
import { ToastContainer } from 'react-toastify';
import { Router } from '@src/routes/routes';
import '@src/app/localization/i18n';
import 'react-toastify/dist/ReactToastify.css';
import '@src/style/_global.scss';
import { CloseButton } from '@src/utils';

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        closeButton={CloseButton}
        hideProgressBar
      />
      <Router />
    </>
  );
}

export default App;
