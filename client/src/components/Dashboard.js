import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import ItemList from './dashboardList/ItemList'

class Dashboard extends Component {
   async componentDidMount() {
      await this.props.getSecret();
   }


   render() {
      let todosFromDB = this.props.secret;
      console.log('todosFromDB: ', todosFromDB);

      let list = <ItemList todosList={todosFromDB} reRenderList={this.props.getSecret} />
      // let todosToRender = [];
      // if (todosFromDB) {
      //    todosFromDB.forEach((item) => {
      //       todosToRender.push(<li key={item._id}>{item.name}; done: {item.done ? 'true' : 'false'}</li>)
      //       // <Item index={item._id} text={item.name} reRenderList={this.reRenderList} isDone={item.done} />
      //    });
      // }
      return (
         <div>
            This is a Dashoboard component
            And the secret of BE is:<br />
            {list}
         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      secret: state.dash.secret
   }
}




export default connect(mapStateToProps, actions)(Dashboard);
