import React, { Component } from 'react'
import Creation from './Creation'
import Item from './Item'
import 'bootstrap/dist/css/bootstrap.css' 


class ItemList extends Component {
    state = {
        isOpen: false
    }

    reRenderList = () => {
        this.setState(state => {
            return { isOpen: !state.isOpen }
        });
    }

    render() {
        let localStorageObj = JSON.parse(localStorage.getItem('LocalStorageNotes'));
        let listOfItems = [];
        let cr = <Creation reRenderList={this.reRenderList} />;
        for (let key in localStorageObj) {
            listOfItems.push(<span key={key}> <Item idInLocalStorage={key} text={localStorageObj[key].value} reRenderList={this.reRenderList} isDone={localStorageObj[key].done} /> </span>)
        }
        return (
            <div>
                {cr}
                <ul className="list-group">
                    {listOfItems}
                </ul>
            </div>
        )
    }

}

export default ItemList