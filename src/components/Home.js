import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { Link } from 'react-router-dom';
// import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 23,
    }
};

class Login extends Component {

    formRef = React.createRef();

    constructor(props){
        super(props);
        this.state = {
            firstName : "",
            lastName : "",
            email : "",
            password : ""
        }
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    onFinish = (values) => {
        const newUser = {
            firstName : values.firstName,
            lastName : values.lastName,
            email : values.email,
            password : values.password
        };

        axios.post("http://localhost:3005/login",newUser);

        this.formRef.current.resetFields();
        this.createDefaultNotificationObject();
        this.openNotification();
    };

    createDefaultNotificationObject = async () => {
        const userNotifications = {
            email : "",
            pushNotification : "",
            textMessages : "",
            phoneCalls : "",
            messageEmail : "",
            messageNoti : "",
            messageTxt : "",
        }

        await axios.post(`http://localhost:3005/notification`,userNotifications);
    }

    openNotification = () => {
        notification.success({
          description:
            'You have successfully registered !',
          duration : 2
        });
    };

    checked = (e) => {
        'checked = ';
    };

    render() {
        
        return (
            <div className = "photo">
                <div className = "app">
                    <div className="leftPart">
                        <div className = "leftPartTop">
                            {/* <div>
                                <ArrowLeftOutlined /> Go Back
                            </div> */}
                            <div style = {{ color : "#a4508b"}}>
                                Welcome !
                            </div>
                            <div style = {{marginTop : "-4px", color : "#a4508b"}}>
                                Have an account? 
                                <Link to = "/login">
                                    <Button type = "text" className = "signInBtn"><span style = {{color : "#a4508b"}} className = "textUnderline">Sign In</span></Button>
                                </Link>
                            </div>
                        </div>
                        <div className = "signUpText">
                            <b className = "bold">Sign up to Brainalityca </b> <br />
                            Sign up on the internal platform 
                        </div>
                        
                        <Form
                        {...layout}
                        name = "basic"
                        ref = {this.formRef}
                        onFinish = {this.onFinish}
                        >
                            <Form.Item
                                name = "firstName"
                                rules = {[
                                    {
                                        required : true,
                                        message : "Please enter your first name !"
                                    }
                                ]}
                            >
                                <Input className = "input" name = "firstName" onChange = { this.changeInput } placeholder = "First Name"/>
                            </Form.Item>

                            <Form.Item
                                name = "lastName"
                                rules = {[
                                    {
                                        required : true,
                                        message : "Please enter your last name !"
                                    }
                                ]}
                            >
                                <Input className = "input" name = "lastName" onChange = { this.changeInput } placeholder = "Last Name"/>
                            </Form.Item>

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

                            <Form.Item
                                name="password"
                                rules = {[
                                    {
                                        required : true,
                                        message : "Please enter your password !"
                                    }
                                ]}
                            >
                                <Input.Password className = "input" name = "password" onChange = { this.changeInput } placeholder = "Password"/>
                            </Form.Item>

                            <Form.Item>
                                <Checkbox style = {{color : "#9EA0A5"}}  onChange={this.checked}>I have read the <span className = "textUnderline" style = {{fontWeight : "400", color : "#333"}}>Terms and Conditions.</span></Checkbox>
                            </Form.Item>
                            
                            <Form.Item >
                                <Button className = "btnSignUp" type = "primary" htmlType = "submit" block>
                                    <span style = {{letterSpacing : "2px", fontWeight : "400"}}>SIGN UP NOW</span> 
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="rightPart oval">
                        
                    </div>
                </div>
                <p className = "login-footer-text">Hello narwhal Cosby sweater McSweeney's, salvia kitsch <br /> before they sold out High Life.</p>
                <div className = "login-photo-footer">
                    
                </div>
                <p className = "login-photo-footer-text">Takamaru Ayako </p>
                <p className = "login-photo-footer-text-2">Manager an inVision</p> 
            </div>
        )
    }
}

export default Login;