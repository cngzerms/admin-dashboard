import React, { Component } from 'react'
import { Form, Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
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
            email : "",
            password : "",
            isTrue : false,
            id : ""
        }
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    onFinish = async (values) => {
        if(values.email !== "" && values.password !== ""){
            const response = await axios.get("http://localhost:3005/login")

            response.data.forEach(userInfo => {
                if(userInfo.email === values.email && userInfo.password === values.password){
                    this.setState({isTrue : true})
                    this.setState({id : userInfo.id})
                }
            });
            
            this.isTrue();
        }
    };

    isTrue = () => {
        const { isTrue, id } = this.state;

        if(isTrue === true){
            localStorage.setItem("currentUserId",id);
            localStorage.setItem("isLogin",Boolean(true));
            this.openNotification();
            this.props.history.push("/profile");
        }else {
            this.formRef.current.resetFields();
            this.openErrNotification();
        }
    } 

    openErrNotification = () => {
        notification.error({
            description: 
                "Email or password incorrect !",
            duration : 2
        });
    };

    openNotification = () => {
        notification.success({
          description:
            'You have successfully logged in !',
          duration : 2
        });
    };

    render() {
        return (
            <div className = "photo">
                <div className = "app">
                    <div className="leftPart" style = {{marginTop : "30px"}}>
                        <div className = "leftPartTop">
                            <div style = {{color : "#a4508b"}}>Don't you have an account ?</div>
                            <div style = {{marginTop : "-4px", color : "#a4508b"}}>
                                <div style = {{marginTop : "-4px", color : "#a4508b", paddingRight : "8px"}}>
                                    <Link to = "/">
                                        <Button type = "text" className = "signInBtn"><span style = {{color : "#a4508b"}} className = "textUnderline">Sign Up</span></Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className = "signUpText">
                            <b className = "bold">Sign in to Brainalityca </b> <br />
                            Sign in the internal platform 
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

                            <Form.Item >
                                <Button className = "btnSignUp" type = "primary" htmlType = "submit" block>
                                    <span style = {{letterSpacing : "2px", fontWeight : "400"}}>SIGN IN</span> 
                                </Button>
                            </Form.Item>
                            <Link to = "/forgot">
                                <span style = {{fontSize : "12px"}}>Forgot Password ?</span>
                            </Link>
                        </Form>
                    </div>
                    <div className="rightPart oval">
                        
                    </div>
                </div>
                <p className = "login-footer-text">Hello narwhal Cosby sweater McSweeney's, salvia kitsch <br /> before they sold out High Life.</p>
                <div className = "login-photo-footer"></div>
                <p className = "login-photo-footer-text">Takamaru Ayako </p>
                <p className = "login-photo-footer-text-2">Manager an inVision</p> 
            </div>
        )
    }
}

export default Login;