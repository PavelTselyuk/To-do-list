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

    clickButtonCreate(props) {
        let value = document.getElementById('elemName').value;
        let login = localStorage.getItem('login');

        axios.post('http://localhost:5000/users/secret/add',
            {
                name: value,
                login: login
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