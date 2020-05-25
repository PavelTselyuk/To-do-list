import React, { Component } from 'react'
import axios from 'axios'


class Item extends Component {
    state = {
        isMade: this.props.isDone
    }

    render() {
        return (
            <div data-id={this.props.index} className="elem list-group-item mt-2" style={{ textDecoration: this.state.isMade ? 'line-through' : 'none' }} >
                <input type="checkbox" className="doneButton mr-4" checked={this.state.isMade} onChange={this.checkboxClick} />
                {this.props.text}
                <div className="delete mr-2" > <button style={{ display: 'inline' }} type="button" className="btn btn-danger align-bottom" onClick={this.handleDeleteClick}>Удалить</button> </div>
            </div>
        )
    }

    handleDeleteClick = (event) => {
        let id = event.target.parentElement.parentElement.dataset.id;

        axios.delete(`todos/${id}/delete`)
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

        axios.post(`/todos/${id}/complete`)
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