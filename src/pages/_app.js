import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from 'config/firebase';
import Login from './login';

import 'styles/globals.css';

const CustomApp = ({ Component, pageProps }) => {
  const [user] = useAuthState(auth);

  if (!user) {
    return (<Login />)
  }

  return (<Component {...pageProps} />);
};

export default CustomApp;
