import React, { Component } from 'react'
import axios from 'axios'
import Creation from './Creation'
import Item from './Item'
import 'bootstrap/dist/css/bootstrap.css'


class ItemList extends Component {
    state = {
        items: [],
        isOpen: true
    }

    componentDidMount() {
        this.getTodos();
    }

    reRenderList = () => {
        this.getTodos();
    }

    render() {
        let itemsFromDB = this.state.items;
        let listOfItems = [];
        let cr = <Creation reRenderList={this.reRenderList} />;
        console.log(itemsFromDB);
        itemsFromDB.forEach((item) => {
            listOfItems.push(<li key={item._id}> <Item index={item._id} text={item.name} reRenderList={this.reRenderList} isDone={item.done} /> </li>)
        })
        return (
            <div className="container">
                {cr}
                <ul className="list-group">
                    {listOfItems}
                </ul>
            </div>
        )
    }

    getTodos = () => {
        axios.get('/todos')
            .then(response => {
                this.setState({
                    items: response.data,
                    isOpen: true
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }
}

export default ItemList