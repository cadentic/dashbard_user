import React from 'react';
import { Dehaze } from '@material-ui/icons';
import img from '../images/default_user.png';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MUIRichTextEditor from 'mui-rte'

const SideBarContainer = styled.div`
    background-color: white;
    display: flex;
    
    flex-direction: column;
    padding-top: 30px;
    width: ${props=> props.width};
    height: 100%;
    border-right: solid 3px #d5d1e8;
    z-index: 2;
    transition: 0.5s;
    overflow-x: hidden;
    padding-left: 30px;
`

const ToggleBtnOpen = styled.div`
    margin-bottom: 45px;
`


const ProfileImg = styled.img`
    border-radius: 100%;
    width: 100px;
    height: 100px;
    border: 2px solid #04193d;
`;

const ProfileText = styled.h5`
    color: #04193d;
    font-size: 1.1rem;
    margin-top: 22px;
    margin-bottom: 22px;
    font-weight: 600;
`

const Bar = styled.div`
    background-color: #d5d1e8;
    height: 1px;
    width: 40%;
    
`

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 22px;
`

const Link = styled.a`
    color: #04193d;
    font-size: 1.1rem;
    margin-bottom: 22px;
    text-decoration: none;
    font-weight: 600;

`

const SideBar = ({links, width, closeDrawer, data}) => {

    return(
        <>
            <SideBarContainer width={width}>
                <ToggleBtnOpen >
                    <Dehaze
                        style={{
                            fontSize: '35px',
                            color: '#04193d'
                        }} 
                        onClick={closeDrawer}
                    />
                </ToggleBtnOpen>
                <ProfileImg 
                    src={img} 
                    alt="profile" />
                <ProfileText>My Profile</ProfileText>
                <Bar />   
                <LinkContainer>
                {
                    links.map((link, index) => {
                        return <Link
                                    key={link.title}
                                    href={link.href}>
                                    {link.title}
                                </Link>
                    })
                }
                </LinkContainer>
                
            </SideBarContainer>
            <MUIRichTextEditor 
                    value={data}
                    label="Start typing..." 
                />
        </>
    )
}

SideBar.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string,
        title: PropTypes.string
    })).isRequired
}

export default SideBar