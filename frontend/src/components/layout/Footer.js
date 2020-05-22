import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from '@aragon/ui';

function Footer({ theme }) {
  const history = useHistory();

  return (
    history.location.pathname.includes('/create/')
      ? <></>
      : (
        <div style={{
          backgroundColor: theme === 'light' ? '#F8F8F8' : '#35425e',
          textAlign: 'center',
          padding: '12px',
          position: 'fixed',
          left: '0',
          bottom: '0',
          height: '40px',
          width: '100%',
          fontSize: '14px'
        }}>
          Powered By
          {' '}
          <Link external href="https://opyn.co/#/">
            Opyn
          </Link>
          {', '}
          <Link external href="https://ui.aragon.org/">
            Aragon UI
          </Link>
          {', '}
          <Link external href="https://compound.finance">
            Compound
          </Link>
          {'. '}
          Hosted on
          {' '}
          {' '}
          <Link external href="https://github.com/carboclan/hip">
            GitHub
          </Link>
        </div>
      )
  );
}

export default Footer;