import React, { Component } from 'react'
import Navbar from "../components/Navbar"
import DashboardChart from "./DashboardChart"
import { Menu, Dropdown, Progress, Card } from 'antd'
import { CaretDownOutlined, CaretUpOutlined, CaretRightOutlined, UndoOutlined, DesktopOutlined, TabletOutlined, MobileOutlined } from '@ant-design/icons'
import { Doughnut } from 'react-chartjs-2';

const data = {
    datasets: [{
      label: 'My First Dataset',
      data: [66, 22, 15],
      backgroundColor: [
        '#1070CA',
        '#EC4C47',
        '#F7D154'
      ],
    }]
};

const menu = (
    <Menu>
        <Menu.Item key = "0">
            Yesterday
        </Menu.Item>
        <Menu.Item key = "1">
            Last 3 days
        </Menu.Item>
        <Menu.Item key = "1">
            Last month
        </Menu.Item>
    </Menu>
)

class Dashboard extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        
    }

    refresh = () => {
        window.location.reload();
    }
    
    render() {
        return (
            <div>
                <Navbar />
                <div className = "dashboard-grid-container">
                    <Card className = "one shadow" bodyStyle = {{padding : "10%"}}>
                        <div style = {{display : "flex", justifyContent : "space-between"}}>
                            <div style = {{fontWeight : 700,fontSize : 12,letterSpacing : 1,color : "#66788A",marginBottom : 0}}>
                                BUDGET <br />
                                <span style = {{fontWeight : 500,fontSize : 24,letterSpacing : -0.06,color : "#212529"}}>$24,000</span>
                            </div>
                            <div className = "red oval"></div>
                        </div>
                        <p style = {{fontWeight : 500,fontSize : 12,letterSpacing : -0.04,color : "#BF0E08",paddingTop : "20%"}}>
                            <CaretDownOutlined />
                            %12
                            <span style = {{marginLeft : 5,fontWeight : 400,fontSize : 12,letterSpacing : -0.04,color : "#66788A"}}>Since last month</span>
                        </p>
                    </Card>
                    <Card className = "two shadow" bodyStyle = {{padding : "10%"}}>
                        <div style = {{display : "flex", justifyContent : "space-between"}}>
                            <div style = {{fontWeight : 700,fontSize : 12,letterSpacing : 1,color : "#66788A",marginBottom : 0}}>
                                TOTAL USERS <br />
                                <span style = {{fontWeight : 500,fontSize : 24,letterSpacing : -0.06,color : "#212529"}}>1600</span>
                            </div>
                            <div style = {{width:64,height:64,borderRadius : "50%",background : "#47B881",padding : "18px 18px"}}>
                               <div className = "green oval"></div>
                            </div>
                        </div>
                        <p style = {{fontWeight : 500,fontSize : 12,letterSpacing : -0.04,color : "#47B881",paddingTop : "20%"}}>
                            <CaretUpOutlined />
                            %16
                            <span style = {{marginLeft : 5,fontWeight : 400,fontSize : 12,letterSpacing : -0.04,color : "#66788A"}}>Since last month</span>
                        </p>
                    </Card>
                    <Card className = "three shadow" bodyStyle = {{padding : "10%"}}>
                        <div style = {{display : "flex", justifyContent : "space-between"}}>
                            <div style = {{fontWeight : 700,fontSize : 12,letterSpacing : 1,color : "#66788A",marginBottom : 0}}>
                                PROGRESS <br />
                                <span style = {{fontWeight : 500,fontSize : 24,letterSpacing : -0.06,color : "#212529"}}>75,5%</span>
                            </div>
                            <div style = {{width:64,height:64,borderRadius : "50%",background : "#1070CA",padding : "18px 18px"}}>
                               <div className = "blue oval"></div>
                            </div>
                        </div>
                        <Progress percent={40} style={{padding : "20% 1%"}} strokeWidth={5} showInfo={false} />
                    </Card>
                    <Card className = "four shadow" bodyStyle = {{padding : "10% 5%"}}>
                        <div style = {{display : "flex", justifyContent : "space-between"}}>
                            <div style = {{fontWeight : 700,fontSize : 12,letterSpacing : 1,marginBottom : 0}}>
                                TOTAL PROFIT <br />
                                <span style = {{fontWeight : 500,fontSize : 24,letterSpacing : -0.06}}>$23,200.00</span>
                            </div>
                            <div className = "total-profit oval"></div>
                        </div>
                        <div style = {{fontSize : 12, letterSpacing : -0.04, paddingTop : "22%"}}>
                            <p style = {{fontWeight : 500}}>
                                <CaretUpOutlined />
                                %16
                                <span style = {{marginLeft : 5,fontWeight : 400}}>Since last month</span>
                            </p>
                        </div>
                    </Card>
                    <div className="five shadow">
                        <div style = {{display : "flex", justifyContent : "space-between", padding : "2px 7px"}}>
                            <div style = {{fontWeight : 500,letterSpacing : -0.05,color : "#3A3B3F"}}>Users by device</div>                    
                            <Dropdown overlay={menu} trigger={['click']}>
                            <p className = "ant-dropdown-link" style={{fontWeight : 500,fontSize : 14, letterSpacing : -0.05, color : "#3A3B3F", cursor : 'pointer'}} >
                                Last 7 days <CaretDownOutlined />
                            </p>
                            </Dropdown>
                        </div>
                        <DashboardChart />
                        <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                        <div style = {{textAlign : "right",padding : "2px 0", fontWeight : 500, fontSize : 14, color: "#1070CA"}}>
                            Audience Overview <CaretRightOutlined />
                        </div>
                    </div>
                    <Card bodyStyle = {{padding : 0}} className = "six shadow">
                        <div style = {{display : "flex", justifyContent : "space-between", alignItems : "center", padding : "3% 2%"}}>
                            <div style={{fontWeight : 500, fontSize: 14,letterSpacing : -0.05,color : "#3A3B3F"}}>Users by device</div>
                            <UndoOutlined onClick = {this.refresh} style = {{cursor :"pointer", width : 22, height : 16}}/>
                        </div>
                        <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                        <Doughnut className = "doughnut" data={data} />
                        <Card bodyStyle = {{padding : 0}} style = {{paddingBottom : "10%"}} bordered = {false}>
                            <div className = "six-grid-inner-div">
                                <div style = {{textAlign : "center"}}>
                                    <DesktopOutlined style = {{color : "#a6b1bb"}}/> 
                                    <div style = {{fontSize : 12,color : "#9EA0A5"}}>Desktop <br /> <span style = {{fontWeight : 500,letterSpacing : -0.24,color : "#1070CA", fontSize : 29}}>63%</span></div>
                                </div>
                                <div style = {{textAlign : "center"}}>
                                    <TabletOutlined style = {{color : "#a6b1bb"}}/> 
                                    <div style = {{fontSize : 12,color : "#9EA0A5"}}>Tablet <br /> <span style = {{fontWeight : 500,letterSpacing : -0.24,color : "#F7D154", fontSize : 29}}>15%</span></div>
                                </div>
                                <div style = {{textAlign : "center"}}>
                                    <MobileOutlined style = {{color : "#a6b1bb"}}/> 
                                    <div style = {{fontSize : 12,color : "#9EA0A5"}}>Mobile <br /> <span style = {{fontWeight : 500,letterSpacing : -0.24,color : "#EC4C47", fontSize : 29}}>22%</span></div>
                                </div>
                            </div>
                        </Card>
                        <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                        <div style = {{display : "flex", justifyContent : "space-between", padding : "8px 2px"}}>
                            <div style={{fontWeight : 500,fontSize : 13, letterSpacing : -0.05, color : "#3A3B3F", cursor : 'pointer'}}>
                                Last 7 days
                                <CaretRightOutlined style = {{color : "#9EA0A5", marginLeft : 2 }}/>
                            </div>
                            <div style = {{color : "#1070CA",fontWeight : 500,fontSize : 13,letterSpacing : -0.05, cursor : "pointer"}}>
                                Audience Devices
                                <CaretRightOutlined style = {{color : "#1665D8", marginLeft : 2}}/>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Dashboard;