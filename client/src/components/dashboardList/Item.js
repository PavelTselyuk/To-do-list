import React, { Component } from 'react';
import axios from 'axios';


class Item extends Component {
    state = {
        isMade: this.props.isDone
    }

    render() {
        return (
            <div data-id={this.props.index} className="elem list-group-item mt-2 row" style={{ textDecoration: this.state.isMade ? 'line-through' : 'none' }} >
                <input type="checkbox" className="doneButton align-bottom col-1" checked={this.state.isMade} onChange={this.checkboxClick} />
                <span className="align-bottom">{this.props.text}</span>
                <div className="delete col-1 float-right">
                    <button type="button" className="btn btn-danger" onClick={this.handleDeleteClick}>Удалить</button>
                </div>
            </div>
        )
    }

    handleDeleteClick = (event) => {
        let id = event.target.parentElement.parentElement.dataset.id;

        axios.delete(`http://localhost:5000/users/secret/delete/${id}`)
            .then(() => {
                this.props.reRenderList();
            })
            .catch((error) => {
                console.log(error);
            })
        this.props.reRenderList();
    }


    checkboxClick = (event) => {
        let id = event.target.parentElement.dataset.id;

        axios.post(`http://localhost:5000/users/secret/complete/${id}`)
            .then(() => {
                this.setState({
                    isMade: !this.state.isMade
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

}


export default Item