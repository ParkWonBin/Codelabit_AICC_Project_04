import React from 'react';

import './listContainer.css';
import {Item} from '../../types/chat';

interface ListContainerProps {
    listName: string;
    listItems: Item[];
    onItemClick: (item: Item) => void;
    onItemCreate: () => void;
}

const handleSelectedItem = (item:Item, event:React.MouseEvent<HTMLDivElement>, onItemClick:(item: Item) => void)=>{
    // CSS 로 선택됨 표시
    const target = event.currentTarget;
    const siblings = target.parentElement?.children;
    if (siblings) {
        Array.from(siblings).forEach(sibling => sibling.classList.remove('selected'));
    }
    target.classList.add('selected');

    onItemClick(item)
}

const ListContainer: React.FC<ListContainerProps> = ({ listName, listItems, onItemClick, onItemCreate }) => {
    return (
    <div className="list-container">
        <div className="list-header">
            <h3>{listName}</h3>
            <button onClick={onItemCreate}>추가</button>
        </div>
        <div className="list-body">
            {listItems.map(item => (
            <div key={item.id} className="list-item" onClick={(event)=> handleSelectedItem(item,event, onItemClick)}>
                <strong>{item.name}</strong><br />
                <small>{item.id}</small>
            </div>
            ))}
        </div>
    </div>
    );
}

export default ListContainer;