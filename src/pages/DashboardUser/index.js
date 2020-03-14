import React, {useMemo, useState, useEffect} from 'react';
import SideBar from '../../layout/SideBar';
import SearchBar from './components/SearchBar';
import { Card, 
         CardContent,
         Grid} from '@material-ui/core';
import { Chart } from 'react-charts'
import { Bar, Line } from 'react-chartjs-2';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import axios from 'axios';
import isEmpty from '../../utils/is-empty';

const drawerWidth = '350px'

const useStyles = makeStyles(theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }));

const Main = styled.div`
    transition: margin-left .5s;
`

const ChartContainer = styled.div`
    height: 103px
`

const CardBalanceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CardBalanceContainerBtn = styled.div`
    display: flex;
    flex-direction: row-reverse;
`

const CardBalanceBtn = styled.button`
    background-color: #0f73ee;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
`

const CardBalanceItem = styled.h2`
    margin: 0 0 10px 0;
    font-size: 50px;
`

const Item = styled.div`
    display: flex;
    justify-content: space-between; 
    align-items: center;   
`

const ItemBtn = styled.button`
    background-color: #0f73ee;
    color: white;
    border: none;
    border-radius: 25px;
    padding: 5px 20px;
    height: fit-content;
`

const DotItem = styled.div`
    background-color: #0f73ee;
    border-radius: 100%;
    padding: 3px;
    margin-right: 8px;
`

const DotTextContainer = styled.div`
    display: flex;
    align-items: center; 
`
const ItemHighly = styled.p`
    color: #0f73ee
`

const IconDollar = styled.i`
    color: #0f73ee;
    font-size: 50px;
`
const ExpenseContainer = styled.div`
    display: flex; 
    justify-content: center
`

const ExpenseProgress = styled.div`
    width: 33.3%;
    margin-right: 10px; 
    margin-left: 10px;
`

const DashboardUser = () => {


    

    const [openDrawer, setOpenDrawer] = useState(true)

    const [dataEditor, setDataEditor] = useState('')


    const [content, setContent] = useState({})

    const [links, setLinks] = useState([])

    const [getGraph, setGetGraph] = useState([])


    const classes = useStyles();


    
    useEffect(() => {
        axios.get('chart.json').then(response => {
            setGetGraph(response.data)
        })
    }, [])

    useEffect(() => {
        axios.get('sidebar-infos.json').then(response => {
            setLinks(response.data.links)
        })
    }, [])

    useEffect(() => {
        axios.get('item.json').then(response => {
            setContent(response.data)
            
        })
    }, [])


    return(
        <>
            <Drawer
                variant="persistent"
                className={classes.drawer}
                anchor="left"
                open={openDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <SideBar
                     links = {links}
                     width = {drawerWidth}
                     closeDrawer = {() => setOpenDrawer(false)}
                     data={dataEditor}
                />
            </Drawer>
            <Main
                navShow={openDrawer} 
                >
                <SearchBar
                    onClick={() => setOpenDrawer(true)}
                    openDrawer={openDrawer}
                />
                <Grid container spacing={3}  style={{ margin: 0, height: '100%', padding: 20, width: '100%'}}>
                    <Grid item xs={12} md={8} >
                        <Card>
                            <CardContent >
                                <h3>income</h3>
                                <ChartContainer style={{height: `200px`}}>
                                {
                                        getGraph.length < 0 ? <div>...loading</div>
                                                     :
                                                    <Line 
                                                        data={getGraph.line}
                                                        height={200}
                                                        options={{
                                                            maintainAspectRatio: false
                                                        }}
                                                    />
                                }
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <h3>balance</h3>
                                <CardBalanceContainer>
                                    <IconDollar 
                                        className="fas fa-dollar-sign"
                                    />
                                    <CardBalanceItem>15.000</CardBalanceItem>
                                </CardBalanceContainer>
                                <CardBalanceContainerBtn>
                                    <CardBalanceBtn>see history</CardBalanceBtn>
                                </CardBalanceContainerBtn>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <h3>growth</h3>
                                <ChartContainer style={{height: `180px`}}>
                                    {
                                        getGraph.length < 0 ? <div>...loading</div>
                                                     :
                                                    <Bar 
                                                        data={getGraph.bar}
                                                        height={150}
                                                        options={{
                                                            maintainAspectRatio: false
                                                        }}
                                                    />
                                    }
                                    
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent> 
                                <h3>expense</h3>
                                <ExpenseContainer>
                                    <ExpenseProgress>
                                        <CircularProgressbar 
                                            styles={{
                                                path: {
                                                    stroke: "#0f73ee"
                                                },
                                                trail: {
                                                    stroke: "#cfecff"
                                                },
                                                text: {
                                                    fill: '#0f73ee',
                                                    fontSize: '35px'
                                                }
                                            }}
                                            value={80} 
                                            text={<tspan dx={-32} dy={10}>80%</tspan>}
                                        />
                                    </ExpenseProgress>

                                    <ExpenseProgress>
                                        <CircularProgressbar 
                                            styles={{
                                                path: {
                                                    stroke: "#0f73ee",
                                                    strokeLinecap: 'butt',
                                                },
                                                trail: {
                                                    stroke: "#cfecff"
                                                },
                                                text: {
                                                    fill: '#0f73ee',
                                                    fontSize: '35px'
                                                }
                                            }}
                                            value={75} 
                                            text={<tspan dx={-32} dy={10}>75%</tspan>}
                                        />
                                    </ExpenseProgress>

                                    <ExpenseProgress>
                                        <CircularProgressbar 
                                            styles={{
                                                path: {
                                                    stroke: "#0f73ee"
                                                },
                                                trail: {
                                                    stroke: "#cfecff"
                                                },
                                                text: {
                                                    fill: '#0f73ee',
                                                    fontSize: '35px'
                                                }
                                            }}
                                            value={50} 
                                            text={<tspan dx={-32} dy={10}>50%</tspan>}
                                        />
                                    </ExpenseProgress>
                                </ExpenseContainer>
                                
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <h3>most viewed item</h3> 
                                {
                                    !isEmpty(content)  ? content.items.map((item, index) => {
                                                            return(
                                                                <Item key={item.key}>
                                                                    <p>{item.title} {item.key}</p>
                                                                    <ItemBtn>Boost</ItemBtn>
                                                                </Item>
                                                            )
                                                        })
                                                        :
                                                        ""
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <h3>invoice</h3>
                                {
                                    !isEmpty(content) ? content.invoices.map((item, index) => {
                                                    return(
                                                        <Item key={item.key}>
                                                            <DotTextContainer>
                                                                <DotItem />
                                                                <p>{item.title}</p>
                                                            </DotTextContainer>
                                                            <ItemBtn>Boost</ItemBtn>
                                                        </Item>
                                                    )
                                                })
                                                :
                                                ""
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <h3>message</h3>
                                {
                                    !isEmpty(content)  ?  content.messages.map((item, index) => {
                                                    return(
                                                    <Item key={index} >
                                                            <ItemHighly>{item.name}</ItemHighly>
                                                            <p>{item.title}</p>
                                                            <p>{item.state}</p>
                                                        </Item> 
                                                    )
                                                })
                                                :
                                                ""
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Main>
            
        </>
    )
}

export default DashboardUser