import React from 'react';

import './style.scss';

export const Table = (props) => {
    // console.log(props.data);
  return (
    <div className="table-common">
        <div className="table-header row">
            <div className="table-cell-title name">Name</div>
            <div className="table-cell-title">Description</div>
            <div className="table-cell-title status">Status</div>
            <div className="table-cell-title action">Acrion</div>
        </div>
        <div className="table-body row">
            {props.data.length === 0 ? <p>No data!</p> : props.data.map((item) => {
                return (
                    <div className="table-row" key={item.id}>
                        <div className="cell name">{item.name}</div>
                        <div className="cell">{item.des}</div>
                        <div className="cell status">{item.status === 'C' ? 'Completed' : 'Pending'}</div>
                        <div className="cell action">
                            <button className="edit" onClick={() => { props.onClickEdit(item) }}>Edit</button>
                            <button className="delete" onClick={() => {props.handleDeleteTodo(item.id) }}>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
