import React, { Component } from 'react'
import UserConsumer from "../context";
import Navbar from "../components/Navbar"
import { Card, Row, Col, Table, Spin, Button, Dropdown, Menu } from "antd"
import { CaretRightOutlined, MoreOutlined, CaretDownOutlined } from '@ant-design/icons'
var _ = require('lodash');


const menu = (
    <Menu>
        <Menu.Item style={{fontWeight : 500,fontSize : 14, letterSpacing : -0.05, color : "#3A3B3F", cursor : 'pointer'}} key = "0">
            Sort by: Oldest
        </Menu.Item>
    </Menu>
)


let columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key : "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      className : "table-title"
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key : "type",
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.type - b.type,
      className : "table-title"
    },
    {
      title: 'Floor',
      dataIndex: 'floor',
      key : "floor",
      filters: [],
      onFilter: (value, record) => record.floor.indexOf(value) === 0,
      className : "table-floor"
    },
    {
      title: 'Latitude',
      dataIndex: 'lat',
      defaultSortOrder: "ascend",
      key : "lat",
      sorter: (a, b) => a.lat - b.lat,
      className : "table-title"
    },
    {
      title: 'Longitude',
      dataIndex: 'lng',
      key : "lng",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.lng - b.lng,
      className : "table-title"
    }
];


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainFilters : [],
            total : 100,
            pageNum: 1,
            pageSize: 6
        }
    }

    render() {

        const paginationProps = {
            total : this.state.total,
            pageSize : this.state.pageSize,
            showQuickJumper : false,
            showTotal : () => `Rows per page:`
        }

        return <UserConsumer>
            {
                value => {
                    const { poilist, loading } = value;

                    let category = _.groupBy(poilist,"floor");
                    let filters = Object.keys(category);
                    this.state.mainFilters = [];

                    filters.map(filter => {
                      let temp = {
                        text : filter,
                        value : filter
                      }
                      this.state.mainFilters.push(temp);
                      return null;
                    })

                    columns[2].filters = this.state.mainFilters;
                    return (
                        <div>
                            <Navbar />
                            <Row style = {{position : "absolute",top : 140, left : 290}}>
                                <Col className = "latest-product-col" xs={2} sm={4} md={6} lg={8} xl={10} >
                                    <Card  style = {{marginRight : 10}} bodyStyle={{padding: 0}}>
                                    <div style={{fontWeight : 500, fontSize: 16,letterSpacing : -0.05,color : "#3A3B3F", paddingLeft : 20, paddingTop : 11, paddingBottom : 11}}>
                                        Latest Products 
                                        <span style = {{fontWeight : 400,fontSize : 12, marginLeft : 15, color : "#9EA0A5"}}>5 in total</span>
                                    </div>
                                        <Card  bodyStyle = {{paddingLeft : 24, paddingTop : 0, paddingBottom : 0}} bordered={false}>
                                            <div style = {{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                                                <div style = {{paddingTop : 20,display : "flex", paddingBottom : 20, alignItems : "center"}}>
                                                    <div className = "avatar av-1"></div>
                                                    <div className = "latest-pro" style = {{fontWeight : 500, fontSize : 16, letterSpacing : -0.06, color : "#3A3B3F", alignItems : "center"}}>
                                                        Dropbox <br /> 
                                                        <span style = {{fontWeight : 400, fontSize : 12, color : "#9EA0A5"}}>Updated 5hr ago</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <MoreOutlined style = {{cursor : "pointer", fontSize : "1.5rem", color : "#9EA0A5"}}/>
                                                </div>
                                            </div>
                                            <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                            <div style = {{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                                                <div style = {{display : "flex", paddingBottom : 20, alignItems : "center", paddingTop : 20}}>
                                                    <div className = "avatar av-2"></div>
                                                    <div style = {{fontWeight : 500, fontSize : 16, letterSpacing : -0.06, color : "#3A3B3F", alignItems : "center"}}>
                                                        Medium Corporation <br /> 
                                                        <span style = {{fontWeight : 400, fontSize : 12, color : "#9EA0A5"}}>Updated 5hr ago</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <MoreOutlined style = {{cursor : "pointer", fontSize : "1.5rem", color : "#9EA0A5"}}/>
                                                </div>
                                            </div>
                                            <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                            <div style = {{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                                                <div style = {{display : "flex", paddingBottom : 20, alignItems : "center", paddingTop : 20}}>
                                                    <div className = "avatar av-3"></div>
                                                    <div style = {{fontWeight : 500, fontSize : 16, letterSpacing : -0.06, color : "#3A3B3F", alignItems : "center"}}>
                                                        Github <br /> 
                                                        <span style = {{fontWeight : 400, fontSize : 12, color : "#9EA0A5"}}>Updated 5hr ago</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <MoreOutlined style = {{cursor : "pointer", fontSize : "1.5rem", color : "#9EA0A5"}}/>
                                                </div>
                                            </div>
                                            <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                            <div style = {{display : "flex", justifyContent : "space-between", alignItems : "center"}}>
                                                <div style = {{display : "flex", paddingBottom : 20, alignItems : "center", paddingTop : 20}}>
                                                    <div className = "avatar av-4"></div>
                                                    <div style = {{fontWeight : 500, fontSize : 16, letterSpacing : -0.06, color : "#3A3B3F", alignItems : "center"}}>
                                                        Slac <br /> 
                                                        <span style = {{fontWeight : 400, fontSize : 12, color : "#9EA0A5"}}>Updated 5hr ago</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <MoreOutlined style = {{cursor : "pointer", fontSize : "1.5rem", color : "#9EA0A5"}}/>
                                                </div>
                                            </div>
                                        </Card>
                                        <div className="dashboard-chart-bottom-rectangle rectangle-default"></div>
                                        <p style = {{textAlign : "right", marginTop : "2%", fontWeight : 500, fontSize : 14,letterSpacing : -0.05,color : "#1070CA"}}>View All <CaretRightOutlined /></p>
                                    </Card>
                                </Col>
                                <Col xs={20} sm={16} md={12} lg={8} xl={2}>
                                    <Card  bodyStyle = {{paddingTop: 0, paddingBottom : 0, paddingLeft : 1, paddingRight : 1}} style = {{width : 750}}>
                                        {/* { poilist && loading ?
                                            <div className = "spinnerContainer" style = {{textAlign : "center"}}>
                                                <Spin size = "large" tip = "Loading !" style = {{color : "#fff", paddingTop : 25}} /> 
                                            </div> 
                                            :
                                            ( */}
                                                <>
                                            <div style = {{display : "flex", justifyContent : "space-between",alignItems : "center"}}>
                                                <div style={{fontWeight : 500, fontSize: 16,letterSpacing : -0.05,color : "#3A3B3F", paddingLeft : 20, paddingTop : 20, paddingBottom : 20}}>
                                                    Latest Orders 
                                                    <span style = {{fontWeight : 400,fontSize : 12, marginLeft : 15, color : "#9EA0A5"}}>3200 total</span>
                                                </div>
                                                <div style = {{display : "flex", justifyContent : "space-between",alignItems : "center"}}>
                                                <Dropdown  overlay={menu} trigger={['click']}>
                                                    <p className = "ant-dropdown-link" style={{fontWeight : 500,fontSize : 14, letterSpacing : -0.05, color : "#3A3B3F", cursor : 'pointer', margin : 0,padding : 0}} >
                                                        Sort by: Newest <CaretDownOutlined style = {{color : "#9EA0A5"}}/>
                                                    </p>
                                                </Dropdown>
                                                <Button style = {{fontSize : 12,fontWeight : 500,letterSpacing : 1.25,color : "#1665D8", marginLeft : 10, marginRight : 10}} type="dash">NEW ENTRY</Button>
                                                </div>     
                                            </div>
                                            <Table pagination={paginationProps} columns={columns} dataSource = {poilist} onChange={this.onChange} rowKey={record => record.id} size = "medium" />
                                                </>
                                            {/* )
                                        } */}
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )
                }
            }
        </UserConsumer>
    }
}
export default Orders;