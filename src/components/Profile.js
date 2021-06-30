import React, { Component } from 'react'
import { Form, Input, Button, Card, notification } from 'antd';
import Navbar from "../components/Navbar"
import axios from "axios"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 0 },
};

class Profile extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            id : "",
            country : "",
            address : "",
            imageUrl : ""
        }
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidMount = async () => {
        const currentId = localStorage.getItem("currentUserId");

        const response = await axios.get(`http://localhost:3005/login/${currentId}`);

        const { firstName, lastName, email, password, id, imageUrl, country, address } = response.data;

        this.formRef.current.setFieldsValue({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            country : country,
            address : address
        })

        this.setState({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            id : id,
            imageUrl : imageUrl,
            country : country,
            address : address
        })

    }

    onFinish = async (e) => {
        e.preventDefault();

        const { firstName, lastName, email, password, id, country, address, imageUrl} = this.state;

        const updatedUser = {
            firstName : firstName,
            lastName : lastName,
            email : email, 
            password : password, 
            id : id,
            country : country,
            address : address,
            imageUrl : imageUrl
        }
        
        await axios.put(`http://localhost:3005/login/${id}`,updatedUser,{headers : {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"}});

        window.location.reload();
        
        this.openSuccessNotification();
    }

    openSuccessNotification = () => {
        notification.success({
            description: 
                "Operation completed successfully !",
            duration : 2
        });
    };

    render() {
        const isLogin = localStorage.getItem("isLogin");

        return (
            <>
                {
                Boolean(isLogin) === true ? <div>
                    <Navbar />
                    <div>
                        <Card style = {{maxWidth : "900px"}} className = "card" type="inner">
                            <span className = "card-inner-text">Basic Profile</span>
                            <span className = "card-inner-text-2">The information can be edited from your profile page.</span>
                            <div className="form-rectangle rectangle-default"></div>
                        </Card>
                        <Card className = "card form-divider-card">
                            <Form
                            {...layout}
                            name = "basic"
                            ref = {this.formRef}
                            onSubmitCapture = {this.onFinish}
                            className = "profile-update-form"
                            >
                                <Form.Item
                                    className = "form-item"
                                    style = {{display : "inline-block", marginRight : "24px"}}
                                    name = "firstName"
                                    rules = {[
                                        {
                                            required : true,
                                            message : "Please enter your first name !"
                                        }
                                    ]}
                                >
                                    <Input  className = "input form-input-mobile" name = "firstName" onChange = { this.changeInput } placeholder = "First Name"/>
                                </Form.Item>

                                <Form.Item
                                    className = "form-item"
                                    style = {{display : "inline-block"}}
                                    name = "lastName"
                                    rules = {[
                                        {
                                            required : true,
                                            message : "Please enter your last name !"
                                        }
                                    ]}
                                >
                                    <Input  className = "input form-input-mobile" name = "lastName" onChange = { this.changeInput } placeholder = "Last Name"/>
                                </Form.Item>

                                <Form.Item
                                    className = "form-item"
                                    style = {{display : "inline-block", marginRight : "24px"}}
                                    name = "email"
                                    rules = {[
                                        {
                                            required : true,
                                            message : "Please enter your email !"
                                        }
                                    ]}
                                >
                                    <Input className = "input form-input-mobile" name = "email" onChange = { this.changeInput } placeholder = "Email Address"/>
                                </Form.Item>

                                <Form.Item
                                    className = "form-item"
                                    style = {{display : "inline-block"}}
                                    name="password"
                                    rules = {[
                                        {
                                            required : true,
                                            message : "Please enter your password !"
                                        }
                                    ]}
                                >
                                    <Input.Password  className = "input form-input-mobile" name = "password" onChange = { this.changeInput } placeholder = "Password"/>
                                </Form.Item>

                                <Form.Item
                                    className = "form-item"
                                    style = {{display : "inline-block", marginRight : "24px"}}
                                    name = "country"
                                    rules = {[
                                        {
                                            required : true,
                                            message : "Please enter your country !"
                                        }
                                    ]}
                                >
                                    <Input  className = "input form-input-mobile" name = "country" onChange = { this.changeInput } placeholder = "Country"/>
                                </Form.Item>

                                <Form.Item
                                    style = {{display : "inline-block"}}
                                    name = "address"
                                    rules = {[
                                        {
                                            required : true,
                                            message : "Please enter your address !"
                                        }
                                    ]}
                                >
                                    <Input  className = "input form-input-mobile" name = "address" onChange = { this.changeInput } placeholder = "Address"/>
                                </Form.Item>

                                    <div className="form-rectangle rectangle-default"></div>
                                <Form.Item className = "form-item" {...tailLayout} style = {{marginTop : "40px", marginBottom : "5px"}}>
                                    <Button className = "btnSaveSettings" type = "primary" htmlType = "submit" block>
                                        <span style = {{letterSpacing : "1.25px", fontWeight : "500", fontSize : "14px"}}>SAVE SETTINGS</span> 
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
export default Profile;