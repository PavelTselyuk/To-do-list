import React, { Component } from 'react'
import Creation from './Creation'
import Item from './Item'


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
        let itemsFromDB = this.props.todosList;
        let listOfItems = [];
        let cr = <Creation reRenderList={this.reRenderList} />;
        console.log(itemsFromDB);
        if(itemsFromDB) {
            itemsFromDB.forEach((item) => {
                listOfItems.push(<li key={item._id}> <Item index={item._id} text={item.name} reRenderList={this.reRenderList} isDone={item.done} /> </li>)
            })
        }
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
        this.props.reRenderList();
        // axios.get('/todos')
        //     .then(response => {
        //         this.setState({
        //             items: response.data,
        //             isOpen: true
        //         })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

    }
}

export default ItemList