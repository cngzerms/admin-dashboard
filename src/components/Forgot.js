import React, { Component } from 'react'
import { Form, Input, Button, notification } from 'antd'
import axios from "axios"
var uniqid = require('uniqid')

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 23,
    }
};

class Forgot extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    sendVerifyCode = async (updatedUser) => {
        const id = updatedUser.id;
        await axios.put(`http://localhost:3005/login/${id}`,updatedUser,{headers : {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"}});
        
        let date = new Date();
        date.setMinutes(date.getMinutes() + 5);
        localStorage.setItem("verifyCodeExpire", date.getTime());

        this.props.history.push("/verification");
    };

    onFinish = async (values) => {
        const response = await axios.get("http://localhost:3005/login")
        response.data.forEach(userInfo => {
            if(userInfo.email === values.email) {
                const newUser = {
                    firstName : userInfo.firstName,
                    lastName : userInfo.lastName,
                    email : userInfo.email,
                    password : userInfo.password,
                    id : userInfo.id,
                    verifyCode : uniqid()
                };
                this.sendVerifyCode(newUser);
            }else {
                this.formRef.current.resetFields();
                this.openNotification();
            }
        })
    };

    openNotification = () => {
        notification.error({
            description:
                "Your email is incorrect !",
            duration : 2
        });
    };

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    render() {

        return (
            <div className = "forgotApp">
                <div className = "forgotBorder">
                    <div>
                        <p className = "bold">Enter your email address and we’ll send you a verification code !</p>
                    </div>
                    
                    <Form
                    {...layout}
                    name = "basic"
                    ref = {this.formRef}
                    onFinish = {this.onFinish}
                    >

                        <Form.Item
                            name = "email"
                            rules = {[
                                {
                                    required : true,
                                    message : "Please enter your email !"
                                }
                            ]}
                        >
                            <Input className = "input" name = "email" onChange = { this.changeInput } placeholder = "Email Address"/>
                        </Form.Item>
                        
                        <Form.Item >
                            <Button className = "btnSignUp" type = "primary" htmlType = "submit" block>
                                <span style = {{letterSpacing : "0.9px", fontWeight : "400"}}>SEND VERIFICATION CODE</span> 
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Forgot;