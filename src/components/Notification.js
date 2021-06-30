import React, { Component } from 'react'
import Navbar from "../components/Navbar"
import { Card, Form, Checkbox, Button, Row, Col, notification } from "antd"
import axios from "axios"

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
};


class Notification extends Component {
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.state = {
            email : "",
            pushNotification : "",
            textMessages : "",
            phoneCalls : "",
            messageEmail : "",
            messageNoti : "",
            messageTxt : "",
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.id] : e.target.checked
        })
    }

    componentDidMount = async () => {
        const currentId = localStorage.getItem("currentUserId");

        const response = await axios.get(`http://localhost:3005/notification/${currentId}`);

        const { email, pushNotification, textMessages, phoneCalls, messageEmail, messageNoti, messageTxt, id } = response.data;

        this.setState({
            email : email,
            pushNotification : pushNotification,
            textMessages : textMessages,
            phoneCalls : phoneCalls,
            messageEmail : messageEmail,
            messageNoti : messageNoti,
            messageTxt : messageTxt,
            id : id
        });

    }

    onFinish = async (e) => {
        e.preventDefault();

        const { email, pushNotification, textMessages, phoneCalls, messageEmail, messageNoti, messageTxt } = this.state;

        const currentUserId = localStorage.getItem("currentUserId");

        const userNotifications = {
            email : email,
            pushNotification : pushNotification,
            textMessages : textMessages,
            phoneCalls : phoneCalls,
            messageEmail : messageEmail,
            messageNoti : messageNoti,
            messageTxt : messageTxt,
            id : currentUserId
        }

        await axios.put(`http://localhost:3005/notification/${currentUserId}`,userNotifications,{headers : {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"}});

        this.openSuccessNotification();
    }

    openSuccessNotification = () => {
        notification.success({
          description:
            'Operation completed successfully !',
          duration : 2
        });
    };

    render() {
        const { email, pushNotification, textMessages, phoneCalls, messageEmail, messageNoti, messageTxt } = this.state;
        const isLogin = localStorage.getItem("isLogin");

        return (
            <>
            {
            Boolean(isLogin) === true ? <div>
                <Navbar />
                <div>
                    <Card style = {{maxWidth : "900px"}} className = "card" type="inner">
                        <span className = "card-inner-text">Notifications</span>
                        <span className = "card-inner-text-2">Manage the notifications and emailing </span>
                        <div className="form-rectangle rectangle-default"></div>
                    </Card>
                    <Card className = "card form-divider-card">
                        <Form
                        {...layout} style = {{float : "left", marginLeft : "-50px"}} onSubmitCapture = {this.onFinish} ref = {this.formRef}
                        >   
                            <Row>
                                <Col className = "col-mobile" style = {{maxWidth : "350px", marginLeft : "50px"}} order = {1}>
                                    <Form.Item style = {{marginBottom : "0"}} >
                                        <p className = "card-inner-text">Notifications</p>
                                    </Form.Item>
                                    <Form.Item  className = "form-item-mobile" name = "email">
                                        <Checkbox onChange={this.onChange} checked = {email} className = "checkbox-text">Email</Checkbox>
                                    </Form.Item>
                                    <Form.Item className = "form-item-mobile" name = "pushNotification">
                                        <Checkbox style = {{width : "300px"}} checked = {pushNotification} onChange={this.onChange} className = "checkbox-text">
                                        Push notifications <br />
                                        <span style = {{fontSize : "12px", color : "#66788A"}}>for your mobile and tablet devices</span>
                                        </Checkbox>
                                    </Form.Item>
                                    <Form.Item className = "form-item-mobile" name = "textMessages">
                                        <Checkbox onChange={this.onChange} checked = {textMessages} className = "checkbox-text">Text Messages</Checkbox>
                                    </Form.Item>
                                    <Form.Item  className = "form-item-mobile" name = "phoneCalls">
                                        <Checkbox onChange={this.onChange} checked = {phoneCalls} className = "checkbox-text">Phone Calls</Checkbox>
                                    </Form.Item>
                                </Col>
                                
                                <Col className = "col-mobile" style = {{marginLeft : "50px"}} order={2} >
                                    <Form.Item style = {{marginBottom : "0"}}>
                                        <p className = "card-inner-text">Messages</p>
                                    </Form.Item>
                                    <Form.Item  className = "form-item-mobile" name = "messageEmail">
                                        <Checkbox onChange={this.onChange} checked = {messageEmail} className = "checkbox-text">Email</Checkbox>
                                    </Form.Item>
                                    <Form.Item className = "form-item-mobile" name = "messageNoti">
                                        <Checkbox style = {{width : "300px"}} checked = {messageNoti} onChange={this.onChange} className = "checkbox-text">Push notifications</Checkbox>
                                    </Form.Item>
                                    <Form.Item   className = "form-item-mobile" name = "messageTxt">
                                        <Checkbox onChange={this.onChange} checked = {messageTxt} className = "checkbox-text">Text Messages</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item className = "col-mobile-btn">
                            <Button 
                            onClick = {this.onClick}
                            style = {{width : "120px", height : "40px", marginLeft : "75px",fontSize : "14px",letterSpacing : "1.25px",fontWeight : "500",color : "#1665D8"}} 
                            type = "dash"
                            htmlType = "submit"
                            >
                                SAVE
                            </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
                
            </div>
            :
            null
            }
            </>
        )
    }
}

export default Notification;