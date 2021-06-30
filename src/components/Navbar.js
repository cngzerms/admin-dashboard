import React, { Component } from 'react'
import { Row, Col, Badge, Alert, Space, Button, notification } from "antd"
import { Link } from 'react-router-dom';
import { LogoutOutlined, NotificationOutlined } from '@ant-design/icons';
import axios from "axios";

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName : "",
            lastName : "",
            logoutAlert : false,
            imageUrl : ""
        }
    }

    logout = () => {
        this.setState({logoutAlert : true})
    };

    acceptLogout = () => {
        this.openSuccessNotification();
        localStorage.setItem("isLogin","");
        localStorage.setItem("currentUserId","");
    };

    openSuccessNotification = () => {
        notification.success({
          description:
            'You have successfully logged out !',
          duration : 2
        });
    };

    componentDidMount = async () => {
        const currentId = localStorage.getItem("currentUserId");

        const response = await axios.get(`http://localhost:3005/login/${currentId}`);

        const { imageUrl, firstName, lastName } = response.data;

        this.setState({
            imageUrl : imageUrl,
            firstName : firstName,
            lastName : lastName
        })
    }

    render() {
        
        const { logoutAlert, imageUrl, firstName, lastName } = this.state;
        return (
            <div>
                <Row className = "bg-blue" style = {{display : "flex", justifyContent : "space-between",minWidth : "1280px"}} >
                    <Col xs={4} sm={4} md={4} lg={4} xl={2} xxl={5}>
                        <div className = "top-left-box">
                            <div className = "oval-box oval"></div>
                            <div className = "top-left-text" >Devias Kit</div>
                            <Badge count={"FREE"} className = "top-left-badge" style = {{background : "#26A69A"}}></Badge>
                        </div>
                    </Col>
                    <Col xs={2} sm={2} md={2} lg={2} xl={4} xxl={5}>
                        <div className = "top-right-icons">
                            <NotificationOutlined style = {{marginRight : "10px"}}/>
                            <LogoutOutlined onClick = {this.logout}/>
                        </div>
                    </Col>
                </Row>
                <div className = "left-bar">
                    <div className="photo-box">
                        {
                            imageUrl ? <img src={"data:image/png;base64,"+imageUrl} alt="avatar" style = {{width : "100px",height : "100px", borderRadius : "50%"}} /> : null
                        }
                        <div className="text-box">
                            {
                                firstName && lastName ?  <p className = "name-text">{firstName + " " + lastName}</p> : null
                            }
                            <p className = "name-text-2">Brain Director</p>
                        </div>
                        <div className = "rectangle rectangle-default"></div>
                        <div className="menu-group">
                            <Link to = "/dashboard">
                                <div className="menu-item menu-item-first">
                                    <div className="menu-item-el oval menu-item-1"></div>
                                    <p style = {{marginTop : "15px"}}>Dashboard</p>
                                </div>
                            </Link>
                            <Link to = "/users">
                                <div className="menu-item menu-item-first">
                                    <div className="menu-item-el oval menu-item-2"></div>
                                    <p style = {{marginTop : "15px"}}>Users</p>
                                </div>
                            </Link>
                            <Link to = "/product">
                                <div className="menu-item">
                                    <div className="menu-item-el oval menu-item-3"></div>
                                    <p style = {{marginTop : "15px"}}>Products</p>
                                </div>
                            </Link>
                            <Link to = "/orders">
                                <div className="menu-item">
                                    <div className="menu-item-el oval menu-item-4"></div>
                                    <p style = {{marginTop : "15px"}}>Latest Orders</p>
                                </div>
                            </Link>
                            <div className="menu-item">
                                <div className="menu-item-el oval menu-item-5"></div>
                                <p style = {{marginTop : "15px"}}>Typography</p>
                            </div>
                            <div className="menu-item">
                                <div className="menu-item-el oval menu-item-6"></div>
                                <p style = {{marginTop : "15px"}}>Icons & Images</p>
                            </div>
                        </div>
                        <div className="rectangle mt-3 rectangle-default"></div>
                        <div className="bottom-menu-group">
                            <div className = "menu-item">
                                <div className="menu-item bottom-menu-item">Support</div>
                            </div>
                            <div className="menu-item">
                                <div className="menu-item-el oval menu-item-7"></div>
                                <p style = {{marginTop : "15px"}}>Support</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "pages">
                    <Link to = "/profile">
                        <p className="page-el">Profile Settings</p>
                    </Link>
                    {/* <div className="blue-rec"></div> */}
                    <Link to = "/prophoto">
                        <p className="page-el">Profile Photo</p>
                    </Link>
                    <Link to = "/notification">
                        <p className="page-el">Notifications</p>
                    </Link>
                    <div className="rectangle-xl rectangle-default"></div>
                </div>
                {
                    logoutAlert ? 
                    <div>
                        <Alert
                        className = "logout-alert"
                        message="Do you want to log out ? "
                        type="warning"
                        action={
                            <Link to = "/">
                                <Space direction="vertical">
                                    <Button size="small" type="primary" onClick = {this.acceptLogout}>
                                        Accept
                                    </Button>
                                </Space>
                            </Link>
                        }
                        closable
                        />
                    </div> : null
                }
            </div>
        )
    }
}
export default Navbar;