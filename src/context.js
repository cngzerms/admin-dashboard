import React, { Component } from 'react'
import api from "./api/api"

const UserContext = React.createContext();

let self = null;
export class UserProvider extends Component {
    state = {
        poilist : [],
        loading : true
    }

    // componentDidMount = async () => {
    //     self = this;
        
    //     api.getPoilist()
    //         .then(function(response){
    //             let ahundredItem = response.data.data.slice(0,100);
    //             self.setState({
    //             poilist : ahundredItem
    //             })
    //             self.setState({
    //             loading : false
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    render() {
        return (
            <UserContext.Provider value = {this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

}

const UserConsumer = UserContext.Consumer;

export default UserConsumer;

