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

class Verification extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            email : ""
        }
    
    }

    openSuccessNotification = () => {
        notification.success({
            description:
              'Your password is changed !',
            duration : 2
          });
    };

    openExpireNotification = () => {
        notification.error({
            description:
              'Your time is up. Please enter new code !',
            duration : 2
        });
    };

    openEmailCheckNotification = () => {
        notification.error({
            description:
              'Your email or verify code is incorrect !',
            duration : 2
        });
    };

    passwordCheckErrorNotification = () => {
        notification.error({
            description:
              'Passwords are not same !',
            duration : 2
        });
    };

    sendVerifyCodeAgain = async (updatedUser) => {
        let id = updatedUser.id;
        let verify = uniqid();

        const newUser = {
            firstName : updatedUser.firstName,
            lastName : updatedUser.lastName,
            email : updatedUser.email,
            password : updatedUser.password2,
            id : updatedUser.id,
            verifyCode : verify
        };

        await axios.put(`http://localhost:3005/login/${id}`,newUser,{headers : {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"}});
        
        let date = new Date();
        date.setMinutes(date.getMinutes() + 5);
        localStorage.setItem("verifyCodeExpire", date.getTime());

    };

    updateUserPassword = async (updatedUser) => {
        let date = new Date();
        let expireTime = localStorage.getItem("verifyCodeExpire");

        if(date.getTime() < expireTime) {
            const newUser = {
                firstName : updatedUser.firstName,
                lastName : updatedUser.lastName,
                email : updatedUser.email,
                id : updatedUser.id,
                password : updatedUser.password
            };
            const id = updatedUser.id;
            await axios.put(`http://localhost:3005/login/${id}`,newUser,{headers : {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"}});
            this.formRef.current.resetFields();
    
            setTimeout(() => {
                this.props.history.push("/login");
            }, 2000);
    
            this.openSuccessNotification();
        }else {
            console.log("***** expire süresi geçti *****");

            this.formRef.current.resetFields();

            this.openExpireNotification();

            this.sendVerifyCodeAgain(updatedUser);
        }
        
    };

    onFinish = async (values) => {

        if(values.newPassword === values.newPasswordAgain) {
            const response = await axios.get("http://localhost:3005/login");
            response.data.forEach(userInfo => {
                if(userInfo.email === values.email && userInfo.verifyCode === values.verify){
                    const newUser = {
                        firstName : userInfo.firstName,
                        lastName : userInfo.lastName,
                        email : userInfo.email,
                        password : values.newPassword,
                        id : userInfo.id,
                        password2 : userInfo.password
                    };
                    this.updateUserPassword(newUser);
                }else {
                    this.formRef.current.resetFields();

                    this.openEmailCheckNotification();
                }
            })
        }else {
            this.formRef.current.resetFields();

            this.passwordCheckErrorNotification();
        }
    };

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    render() {

        return (
            <div className = "verifyApp">
                <div className = "forgotBorder">
                    <div>
                        <p className = "bold">Enter your verify code and new password !</p>
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
                            <Input className = "input" name = "email" onChange = { this.changeInput } placeholder = "Email"/>
                        </Form.Item>

                        <Form.Item
                            name = "verify"
                            rules = {[
                                {
                                    required : true,
                                    message : "Please enter your verify code !"
                                }
                            ]}
                        >
                            <Input className = "input" name = "verify" onChange = { this.changeInput } placeholder = "Verify Code"/>
                        </Form.Item>

                        <Form.Item
                            name = "newPassword"
                            rules = {[
                                {
                                    required : true,
                                    message : "Please enter your new password !"
                                }
                            ]}
                        >
                            <Input.Password className = "input" name = "newPassword" onChange = { this.changeInput } placeholder = "New Password"/>
                        </Form.Item>

                        <Form.Item
                            name = "newPasswordAgain"
                            rules = {[
                                {
                                    required : true,
                                    message : "Please enter your new password again !"
                                }
                            ]}
                        >
                            <Input.Password className = "input" name = "newPasswordAgain" onChange = { this.changeInput } placeholder = "New Password Again"/>
                        </Form.Item>
                        
                        <Form.Item >
                            <Button className = "btnSignUp" type = "primary" htmlType = "submit" block>
                                <span style = {{letterSpacing : "0.9px", fontWeight : "400"}}>CHANGE PASSWORD</span> 
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Verification;