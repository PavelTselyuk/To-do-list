import React, { Component } from 'react'

class Item extends Component {
    state = {
        isMade: true
    }

    idInLocalStorage = this.props.idInLocalStorage;
    render() {
        return (
            <li data-id={this.props.idInLocalStorage} className={this.props.isDone ? "elem list-group-item doneElem mt-2" : "elem list-group-item mt-2"}>
                <input type="checkbox" className="doneButton" checked={this.props.isDone} onChange={this.checkboxClick} />
                {this.props.text}
                <button type="button" className = "delete btn btn-danger float-right align-top" onClick={this.handleDeleteClick}>Удалить</button>
            </li>
        )
    }

    handleDeleteClick = (event) => {
        let localStorageObj = JSON.parse(localStorage.getItem('LocalStorageNotes'));
        let id = event.target.parentElement.dataset.id;
        delete localStorageObj[id];
        localStorage.setItem('LocalStorageNotes', JSON.stringify(localStorageObj));
        this.props.reRenderList();
    }

    checkboxClick = (event) => {
        let localStorageObj = JSON.parse(localStorage.getItem('LocalStorageNotes'));
        let id = event.target.parentElement.dataset.id;
        localStorageObj[id].done = !localStorageObj[id].done;
        localStorage.setItem('LocalStorageNotes', JSON.stringify(localStorageObj));
        this.props.reRenderList();
    }

}


export default Item