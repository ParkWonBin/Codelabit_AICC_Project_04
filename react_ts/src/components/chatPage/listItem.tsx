import React from 'react';

import './listItem.css';
import {Item} from '../../types/chat';

const ListItem: React.FC<Item> = ({ id, name }) => (
  <div className="list-item">
    <strong>{name}</strong>
    <br/>
    <small>{id}</small>
  </div>
);

export default ListItem;

