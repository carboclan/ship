import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  Header, DataView, IdentityBadge, Tabs, Timer, Table, TableHeader, TableRow, TableCell, Text
} from '@aragon/ui';

import { getPreference, storePreference } from '../../utils/storage';
import Exercise from './Exercise';

function Portfolio() {
  const NOW = Date.now()
  const DAY = 1000 * 60 * 60 * 24

  const addr = '0x99dE7B407C4d26909527001e2556Aa5D159F316d';
  const addr2 = '0xAD87c0E80Ab5E13F15757d5139cc6c6fcb823Be3';
  const endDate = new Date(NOW + 5 * DAY)

  return (
    <div style={{ height: "75vh", marginTop: "75px" }}>
      <Header primary="Portfolio" />
      <Table
    header={
      <TableRow>
        <TableHeader title="ACTIVE" />
      </TableRow>
    }
  >
    <TableRow>
      <TableCell>
        <Text>Project Name</Text>
      </TableCell>
      <TableCell>
        <Text>Underlying Asset (Equity Tokens)</Text>
      </TableCell>
      <TableCell>
        <Text>Collateral Asset (Cash Bounties)</Text>
      </TableCell>
      <TableCell>
        <Text>Strike Price</Text>
      </TableCell>
      <TableCell>
        <Text>Expiry</Text>
      </TableCell>
      <TableCell>
        <Text>Address</Text>
      </TableCell>
      <TableCell>
        <Text>Exercise</Text>
      </TableCell>
    </TableRow>
    <TableRow>
    <TableCell>
        <Text>Honeylemon.market</Text>
      </TableCell>
      <TableCell>
        <Text>20,000 HLMN</Text>
      </TableCell>
      <TableCell>
        <Text>2,000 DAI</Text>
      </TableCell>
      <TableCell>
        <Text>0.1 DAI/HLMN</Text>
      </TableCell>
      <TableCell>
        <Text><Timer end={endDate} /></Text>
      </TableCell>
      <TableCell>
        <Text><IdentityBadge entity={addr} shorten={true} /></Text>
      </TableCell>
      <TableCell>
        <Text><Exercise/></Text>
      </TableCell>
    </TableRow>
    <TableRow>
    <TableCell>
        <Text>Liqui3D</Text>
      </TableCell>
      <TableCell>
        <Text>6,666.7 $HIP</Text>
      </TableCell>
      <TableCell>
        <Text>1,666.7 DAI</Text>
      </TableCell>
      <TableCell>
        <Text>0.25 DAI/$HIP</Text>
      </TableCell>
      <TableCell>
        <Text><Timer end={endDate} /></Text>
      </TableCell>
      <TableCell>
        <Text><IdentityBadge entity={addr2} shorten={true} /></Text>
      </TableCell>
      <TableCell>
        <Text><Exercise/></Text>
      </TableCell>
    </TableRow>
  </Table>
    </div>
  );
}

export default Portfolio;