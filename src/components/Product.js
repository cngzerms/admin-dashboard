import React, { Component } from 'react'
import Navbar from "../components/Navbar"
import { Input, Button, Card, Col, Row } from "antd"
import { SearchOutlined, ClockCircleOutlined, DownloadOutlined } from "@ant-design/icons"

class Product extends Component {

    render() {
        return (
            <div>
                <Navbar />
                
                <div className = "main-div-product">
                    <div className = "product-top oval">
                        <div style = {{width : 100, height : 100, background : "#fff", borderRadius : "50%", justifyContent : "center", display : "flex",alignItems : "center",position : "absolute", top : 150, left : 25}}>
                            <div className = "oval product-bottom"></div>
                        </div>
                        <div style = {{position : "absolute", top : 200, left : 140}}>
                            <span style = {{fontWeight : 500, fontSize : 10, color : "#9EA0A5"}}>PRODUCTS</span> <br />
                            <span style = {{fontWeight : 500, fontSize : 16, letterSpacing : -0.06, color : "#3a3b3f"}}>Devias Products</span>
                        </div>
                    </div>
                    <div style = {{display :"flex", justifyContent : "space-between"}}>
                        <Input style = {{background : "#fff", width : "33%"}} prefix = {<SearchOutlined style = {{color : "#9EA0A5", marginRight : 2 }}/>} bordered = {false} placeholder= "Search users by name" />
                        <Button style = {{background : "#47B881", color : "#fff", fontWeight : 500, fontSize : 14, letterSpacing : 1.25, borderRadius : 4}}>NEW PRODUCT</Button>
                    </div>    

                    <div className="site-card-wrapper" style = {{marginTop : 30, paddingBottom : 30}}>
                        <Row gutter={[16,16]}>
                            <Col span={8}>
                                <Card bordered={false} bodyStyle = {{paddingBottom : 5}} style = {{display : "flex", justifyContent : "center"}} >
                                    <div style = {{display : "flex" , justifyContent : "center"}}>
                                        <div className = "oval pro-item pro-1"></div>
                                    </div>
                                    <p style = {{textAlign : "center", fontWeight : 500, fontSize : 16, color : "#212b36"}}>
                                        Dropbox <br />
                                        <p style = {{fontWeight : 400, fontSize : 12, color : "#66788a"}}>
                                            Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.
                                        </p>
                                    </p>
                                    <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                    <div style = {{display : "flex", justifyContent : "space-between", marginTop : 5, color : "#66788A", fontWeight : 400, fontSize : 12}}>
                                        <div>
                                            <ClockCircleOutlined /> Updated 2hr ago
                                        </div>
                                        <div>
                                            <DownloadOutlined style = {{marginRight : 5 }}/>
                                            594 Download
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} bodyStyle = {{paddingBottom : 5}} style = {{display : "flex", justifyContent : "center"}} >
                                    <div style = {{display : "flex" , justifyContent : "center"}}>
                                        <div className = "oval pro-item pro-2"></div>
                                    </div>
                                    <p style = {{textAlign : "center", fontWeight : 500, fontSize : 16, color : "#212b36"}}>
                                        Medium Corporation <br />
                                        <p style = {{fontWeight : 400, fontSize : 12, color : "#66788a"}}>
                                            Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.
                                        </p>
                                    </p>
                                    <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                    <div style = {{display : "flex", justifyContent : "space-between", marginTop : 5, color : "#66788A", fontWeight : 400, fontSize : 12}}>
                                        <div>
                                            <ClockCircleOutlined /> Updated 2hr ago
                                        </div>
                                        <div>
                                            <DownloadOutlined style = {{marginRight : 5 }}/>
                                            594 Download
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} bodyStyle = {{paddingBottom : 5}} style = {{display : "flex", justifyContent : "center"}} >
                                    <div style = {{display : "flex" , justifyContent : "center"}}>
                                        <div className = "oval pro-item pro-3"></div>
                                    </div>
                                    <p style = {{textAlign : "center", fontWeight : 500, fontSize : 16, color : "#212b36"}}>
                                        Slack <br />
                                        <p style = {{fontWeight : 400, fontSize : 12, color : "#66788a"}}>
                                            Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.
                                        </p>
                                    </p>
                                    <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                    <div style = {{display : "flex", justifyContent : "space-between", marginTop : 5, color : "#66788A", fontWeight : 400, fontSize : 12}}>
                                        <div>
                                            <ClockCircleOutlined /> Updated 2hr ago
                                        </div>
                                        <div>
                                            <DownloadOutlined style = {{marginRight : 5 }}/>
                                            594 Download
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} bodyStyle = {{paddingBottom : 5}} style = {{display : "flex", justifyContent : "center"}} >
                                    <div style = {{display : "flex" , justifyContent : "center"}}>
                                        <div className = "oval pro-item pro-4"></div>
                                    </div>
                                    <p style = {{textAlign : "center", fontWeight : 500, fontSize : 16, color : "#212b36"}}>
                                        Lyft <br />
                                        <p style = {{fontWeight : 400, fontSize : 12, color : "#66788a"}}>
                                            Lyft is an on-demand transportation company based in San Francisco, California.
                                        </p>
                                    </p>
                                    <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                    <div style = {{display : "flex", justifyContent : "space-between", marginTop : 5, color : "#66788A", fontWeight : 400, fontSize : 12}}>
                                        <div>
                                            <ClockCircleOutlined /> Updated 2hr ago
                                        </div>
                                        <div>
                                            <DownloadOutlined style = {{marginRight : 5 }}/>
                                            594 Download
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} bodyStyle = {{paddingBottom : 5}} style = {{display : "flex", justifyContent : "center"}} >
                                    <div style = {{display : "flex" , justifyContent : "center"}}>
                                        <div className = "oval pro-item pro-5"></div>
                                    </div>
                                    <p style = {{textAlign : "center", fontWeight : 500, fontSize : 16, color : "#212b36"}}>
                                        GitHub <br />
                                        <p style = {{fontWeight : 400, fontSize : 12, color : "#66788a"}}>
                                            GitHub is a web-based hosting service for version control of code using Git.
                                        </p>
                                    </p>
                                    <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                    <div style = {{display : "flex", justifyContent : "space-between", marginTop : 5, color : "#66788A", fontWeight : 400, fontSize : 12}}>
                                        <div>
                                            <ClockCircleOutlined /> Updated 2hr ago
                                        </div>
                                        <div>
                                            <DownloadOutlined style = {{marginRight : 5 }}/>
                                            594 Download
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false} bodyStyle = {{paddingBottom : 5}} style = {{display : "flex", justifyContent : "center"}} >
                                    <div style = {{display : "flex" , justifyContent : "center"}}>
                                        <div className = "oval pro-item pro-6"></div>
                                    </div>
                                    <p style = {{textAlign : "center", fontWeight : 500, fontSize : 16, color : "#212b36"}}>
                                        Squarespace <br />
                                        <p style = {{fontWeight : 400, fontSize : 12, color : "#66788a"}}>
                                            Squarespace provides software as a service for website building and hosting. Headquartered in NYC.
                                        </p>
                                    </p>
                                    <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                    <div style = {{display : "flex", justifyContent : "space-between", marginTop : 5, color : "#66788A", fontWeight : 400, fontSize : 12}}>
                                        <div>
                                            <ClockCircleOutlined /> Updated 2hr ago
                                        </div>
                                        <div>
                                            <DownloadOutlined style = {{marginRight : 5 }}/>
                                            594 Download
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>          
                </div>
            </div>
        )
    }
}

export default Product;