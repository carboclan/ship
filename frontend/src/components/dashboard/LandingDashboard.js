import React from 'react';
import { useHistory } from 'react-router-dom';
import MesaLogo from '../assets/honeylemon.png'
import plus from '../assets/plus.png'
import liquid from '../assets/liquid.png'
import flash from '../assets/flash.png'
import f from '../assets/1.png'
import s from '../assets/2.png'
import t from '../assets/3.png'




import {
  Header, Box, LinkBase, Tag,
} from '@aragon/ui';

function Dashboard() {
  const history = useHistory();

  return (
    <div style={{ height: "75vh", marginTop: "15px" }}>
      <div style={{ padding: '1%', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '30%', marginRight: '3%' }}>
          <img src={f} width="250px" height="250px"/>
        </div>

        <div style={{ width: '30%' }}>
        <img src={s} width="250px" height="250px"/>
        </div>
        <div style={{ width: '40%', marginLeft: '3%' }}>
        <img src={t} width="250px" height="250px"/>
        </div>
      </div>
    </div>
  );
}

const MainButtonPropx = {
  title: String,
  description: String,
  iconUrl: {},
  secondImg: Image,
  onClick: Function,
  tag: String
}

function MainButton({
  title, description, iconUrl, secondImg, onClick, tag,
} = MainButtonPropx) {
  return (
    <LinkBase onClick={onClick} style={{ width: '100%' }}>
      <Box>
        <div style={{ padding: 10, fontSize: 18 }}>
          {title}
          {tag ? <Tag>{tag}</Tag> : <></>}
        </div>
        <img alt="icon" style={{ padding: 10, height: 64 }} src={iconUrl} />
        { secondImg && <img alt="icon" style={{ padding: 10, height: 64 }} src={secondImg} /> } 
        <div style={{ paddingTop: 5, opacity: 0.5 }}>
          {' '}
          {description}
          {' '}
        </div>

      </Box>
    </LinkBase>
  );
}

export default Dashboard;