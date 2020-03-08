import React, {useState, useRef} from 'react';
import styled from 'styled-components';
 
const SearchBarContainer = styled.div`
    background-color: white;
    display : flex;
    padding: 10px 20px;
    border-bottom: 3px solid #d5d1e8;
    align-items: center;
    position: ${props => props.sticky ? 'fixed' : 'relative'};
    top: ${props => props.sticky ? '0' : 'none'};
    left: ${props => props.sticky ? '0' : 'none'};
    width: ${props => props.sticky ? '100%' : 'auto'};
    flex-wrap: wrap;
    z-index: 1;
`

const SearchInputContainer = styled.div`
    flex: 2;
    display: flex;
`
const SearchInput = styled.input`
    border: none;
    padding-left: 30px;
    flex: 2;
    color: #04193d;
    &:focus {
        outline: none;
    }
`
const SearchNotifContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
`

const SearchNotif = styled.div`
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
`

const SearchNotifBubble = styled.div`
    position: absolute;
    background-color: #51d0e6;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 100%;
`
const BigIcon = styled.i`
    color: #04193d;
    font-size: 35px;
`

const ToggleIcon = styled.i`
    color: #04193d;
    font-size: 35px;
    margin-right: 8px;
    display: ${props => !props.showToggle ? 'block' : 'none'}
`

const NotifIcon = styled.i`
    color: #04193d;
    font-size: 18px;
`

const SearchBar = ({showNav, onClick}) => {

    const [barSticky, setBarSticky] = useState(false);

    const stickyBar = useRef()

    document.addEventListener('scroll', (() => {
        let sticky = stickyBar.current.offsetTop
        console.log(window.pageYOffset)
        if (window.pageYOffset > sticky) {
            setBarSticky(true)
        } else {
            setBarSticky(false)
        }
    }))


    return(
        <SearchBarContainer
            ref={stickyBar}
            sticky={barSticky} 
            >
            <ToggleIcon 
                className="fas fa-bars"
                showToggle={showNav}
                onClick={onClick}
            />
            <SearchInputContainer>
                <BigIcon
                    className="fas fa-search"
                />
                <SearchInput value="Search something" />
            </SearchInputContainer>
            <SearchNotifContainer>
                <SearchNotif>
                    <SearchNotifBubble />
                    <NotifIcon 
                        className="far fa-bell"
                    />
                </SearchNotif>
                <SearchNotif>
                    <SearchNotifBubble />
                    <NotifIcon 
                        className="far fa-comment"
                    />
                </SearchNotif>
                <SearchNotif>
                    <NotifIcon 
                        className="far fa-user-circle"
                    />
                </SearchNotif>
            </SearchNotifContainer>
        </SearchBarContainer>
    )
}

export default SearchBar