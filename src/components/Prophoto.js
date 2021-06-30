import React, { Component } from 'react'
import { Card, Button, Upload, message, notification } from "antd"
import Navbar from "../components/Navbar"
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
})
  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Prophoto extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading : false,
            firstName : "",
            lastName : "",
            email : "",
            password : "",
            id : "",
            imageUrl : ""
        }
    }

    openSuccessNotification = () => {
        notification.success({
          description:
            'Operation completed successfully !',
          duration : 2
        });
    };

    validatePhoto = () => {
        const { imageUrl } = this.state;
        if(imageUrl !== ""){
            return true;
        }
        return false;
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          toBase64(info.file.originFileObj)
            .then((resp) => {
              let base64Str = resp.toString().replace(/^data:(.*,)?/, '');
              this.setState({loading : false, imageUrl : base64Str});
            }
          )
          .catch(err => {
            console.log(err);
          });
        }
    };

    addPhoto = () => {
        const { imageUrl, firstName, lastName, email, password, id } = this.state;

        if(!this.validatePhoto()){
            this.setState({
                error : true
            })
        }

        const userWithPhoto = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            id : id,
            imageUrl : imageUrl
        }

        this.addUserWithPhoto(userWithPhoto);
    }

    addUserWithPhoto = async (userWithPhoto) => {
        const { id } = userWithPhoto;
        await axios.put(`http://localhost:3005/login/${id}`,userWithPhoto,{headers : {"Content-Type" : "application/json", "Access-Control-Allow-Origin" : "*"}});
        window.location.reload();
        this.openSuccessNotification();
    }

    removePhoto =  () => {
        const { firstName, lastName, email, password, id } = this.state;

        const userWithPhoto = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            id : id,
            imageUrl : ""
        }

        this.addUserWithPhoto(userWithPhoto);
    }

    componentDidMount = async () => {
        const currentId = localStorage.getItem("currentUserId");

        const response = await axios.get(`http://localhost:3005/login/${currentId}`);

        const { firstName, lastName, email, password, imageUrl, id } = response.data;

        this.setState({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : password,
            imageUrl : imageUrl,
            id : id
        })
    }
    
    render() {
        const isLogin = localStorage.getItem("isLogin");

        const { loading, imageUrl, firstName, lastName, email } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> :<PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
            {
            Boolean(isLogin) === true ? <div>
                <Navbar />
                <div style = {{width : "375px",textAlign : "center", position : "absolute", top : "200px", left : "350px"}}>
                    <Card type = "inner">
                        <div style={{display: "flex",justifyContent : "space-between"}}>
                            <div style = {{textAlign : "left"}}>
                                {
                                    firstName && lastName ? <p style={{fontWeight : "500",fontStyle : "normal",fontSize : "24px",letterSpacing : "-0.06px", color : "#212529", marginBottom : "0px"}}>{firstName + " " + lastName}</p> : null
                                } 
                                {
                                    email ? <p style={{fontWeight : "400",fontStyle : "normal", fontSize : "14px", letterSpacing : "-0.05px",color : "#9EA0A5"}}>{email}</p> : null
                                }
                            </div>
                            <div>
                                <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="http://localhost:3005/avatars"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            > 
                                {imageUrl ?  <img src={"data:image/png;base64,"+imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div style = {{display : "flex", justifyContent : "space-between"}}>
                            <Button onClick = {this.addPhoto} className = "photoBtn" type = "text" style = {{color : "#1665D8"}}>UPLOAD PICTURE</Button>
                            <Button onClick = {this.removePhoto} className = "photoBtn" type = "text" style = {{color : "#425A70"}}>REMOVE PICTURE</Button>
                        </div>
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

export default Prophoto;
