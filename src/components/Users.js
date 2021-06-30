import React, { Component } from 'react'
import Navbar from "../components/Navbar"
import UserConsumer from "../context"
import Highlighter from 'react-highlight-words'
import { Table, Spin, Card, Row, Col, Radio, Button, Input } from "antd"
import { FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons"

const rowSelection = {
    onChange: (selectedRows) => {
        if(selectedRows.length >= 1){
            document.querySelector(".table-column-name").innerHTML = `Selected ${selectedRows.length} users`
        }else {
            document.querySelector(".table-column-name").innerHTML = `Name`
        }
    
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
};

class Users extends Component {
    
    state = {
        selectionType : "checkbox",
        searchText: '',
        searchedColumn: "name",
        searchedColumn2 : "floor"
    };
    
    getColumnSearchProps = dataIndex => ({
        render: text =>
          this.state.searchedColumn === dataIndex || this.state.searchedColumn2 === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
    });

    search = (rows) => {
        return rows.filter(row => row.name.toLowerCase().indexOf(this.state.searchText) + row.floor.toLowerCase().indexOf(this.state.searchText) > -2);
    }

    changeInput = (e) => {
        this.setState({
            searchText : e.target.value
        })
    }
    
    render(){

        let columns = [
            {
            title: 'Name',
            dataIndex: 'name',
            key : "name",
            className : "table-column-name",
            ...this.getColumnSearchProps('name'),
            },
            {
            title: 'Type',
            dataIndex: 'type',
            key : "type",
            className : "table-column"
            },
            {
            title: 'Floor',
            dataIndex: 'floor',
            key : "floor",
            className : "table-column",
            ...this.getColumnSearchProps("floor")
            },
            {
            title: 'Latitude',
            dataIndex: 'lat',
            key : "lat",
            className : "table-column"
            },
            {
            title: 'Longitude',
            dataIndex: 'lng',
            key : "lng",
            className : "table-column"
            }
        ];

        const showTotal = {
            showTotal : () => `Rows per page:`
        };

        const { selectionType } = this.state;

        return <UserConsumer>
            {
                value => {
                    // const { poilist, loading } = value;

                    return (
                        <div>
                            <Navbar />
                            <div style = {{position : "absolute", top : 140, left : 290, width : "80%"}}>
                                {
                                    // poilist && loading ?
                                    // <div className = "spinnerContainer" style = {{textAlign : "center"}}>
                                    //     <Spin size = "large" tip = "Loading !" style = {{color : "#fff", paddingTop : 25}} /> 
                                    // </div>
                                    // :
                                    (
                                        <>
                                            <Row gutter={[0, 8]}>
                                                <Col span = {3}>
                                                    <Button style = {{fontWeight : 500,fontSize : 14,letterSpacing : 1.25, borderRadius : 4,color : "#3a3b3f", border : "none"}}><FilterOutlined style = {{borderColor : "#9EA0A5 !important"}} />FILTER</Button>
                                                </Col>
                                                <Col span = {8}>
                                                    <Card bodyStyle = {{padding : 0}} style = {{border : "none"}}>
                                                        <Input onChange = {this.changeInput} prefix = {<SearchOutlined style = {{color : "#9EA0A5", marginRight : 2 }}/>} bordered = {false} placeholder= "Search users by name" />
                                                    </Card>
                                                </Col>
                                                <Col span = {8}>
                                                </Col>
                                                <Col span = {3} >
                                                    <Button style = {{fontWeight : 500,fontSize : 14,letterSpacing : 1.25, borderRadius : 4,color : "#fff", background : "#1665d8"}}><PlusOutlined style = {{borderColor : "#1665D8 !important"}} />ADD USER</Button>
                                                </Col>

                                                <Col span={24}>
                                                    <Card bodyStyle = {{padding: 0}} style = {{width : "90%"}}>
                                                        <Radio.Group 
                                                            value={selectionType}
                                                        >
                                                        </Radio.Group>
                                                        <Table 
                                                        rowSelection = {{
                                                        type: selectionType,
                                                        ...rowSelection,
                                                        }}
                                                        pagination = {showTotal}
                                                        columns={columns}
                                                        // dataSource = {this.search(poilist)}
                                                        // dataSource =  {null}
                                                        rowKey={record => record.id}  
                                                        />
                                                    </Card>
                                                </Col>
                                            </Row>
                                            
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            }
        </UserConsumer>
    }
    
}

export default Users;