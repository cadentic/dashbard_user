import React, {useMemo, useState} from 'react';
import SideBar from '../../layout/SideBar';
import SearchBar from './components/SearchBar';
import { Card, 
         CardContent,
         Grid} from '@material-ui/core';
import { Chart } from 'react-charts'
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import sidebarInfo from '../../json/sidebar-infos.json';
import content from '../../json/item.json';
import chart from '../../json/chart.json';


const Main = styled.div`
    margin-left: ${props => props.navShow ? '180px' : '0px'};
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

    const [showNav, setShowNav] = useState(true)

    const axes = useMemo(() => chart.axes, [])

    const graph = useMemo(() => [chart.graph], [])

    const bar = useMemo(() => [chart.bar], [])

    return(
        <>
            <SideBar  
                links={sidebarInfo.links}
                profileImg={sidebarInfo.img_profile}
                toggleClick={() => setShowNav(false)}
                width={showNav ? '180px' : '0px'}
            />
            <Main
                navShow={showNav} 
                >
                <SearchBar
                    onClick={() => setShowNav(true)}
                    showNav={showNav}
                />
                <Grid container spacing={3}  style={{ margin: 0, height: '100%', padding: 20, width: '100%'}}>
                    <Grid item xs={12} md={8} >
                        <Card>
                            <CardContent >
                                <h3>income</h3>
                                <ChartContainer style={{height: `103px`}}>
                                    <Chart 
                                        data={graph} 
                                        axes={axes}
                                        series={{type: 'area'}}
                                    />
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
                                <ChartContainer style={{height: `103px`}}>
                                    <Chart 
                                        data={bar} 
                                        axes={axes}
                                        series={{type: 'bar'}}
                                    />
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
                                    content.items.map((item, index) => {
                                        return(
                                            <Item key={item.key}>
                                                <p>{item.title} {item.key}</p>
                                                <ItemBtn>Boost</ItemBtn>
                                            </Item>
                                        )
                                    })
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <h3>invoice</h3>
                                {
                                    content.invoices.map((item, index) => {
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
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <h3>message</h3>
                                {
                                    content.messages.map((item, index) => {
                                        return(
                                           <Item key={index} >
                                                <ItemHighly>{item.name}</ItemHighly>
                                                <p>{item.title}</p>
                                                <p>{item.state}</p>
                                            </Item> 
                                        )
                                    })
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