import React, { Component } from 'react'
import axios from 'axios'

class Creation extends Component {
    state = {
        isDone: true
    }

    render() {
        return (
            <div className="creation">
                <form>
                    <input id="elemName" type="text" size="60" placeholder=""
                        onKeyDown={(event) => this.inputKeyDown(event)} />
                    <button id="create" onClick={() => this.clickButtonCreate(this.props)} type="button">Создать</button>
                </form>
            </div>
        )
    }

    inputKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.clickButtonCreate(this.props);
        }
        return;
    }

    changeInputValue(event) {
        console.log("onChange");
    }

    clickButtonCreate(props) {
        let value = document.getElementById('elemName').value;

        axios.post('/todos/create',
            {
                name: value
            })
            .then(() => {
                this.setState({ isDone: !this.state.isDone });
                document.getElementById('elemName').value = "";
                props.reRenderList();
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export default Creation