import React from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SidebarChannel from '../SidebarChannel/SidebarChannel'
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CallIcon from '@material-ui/icons/Call'
import { Avatar } from '@material-ui/core'
import MicIcon from '@material-ui/icons/Mic'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { auth } from '../../Core/firebase'
import { useState } from 'react'
import { useEffect } from 'react'


import axios from '../../Core/axios' 
import Pusher from 'pusher-js'

const pusher = new Pusher('649e842b7808cb346bb4', {
    cluster: 'us3'
  });



const Sidebar = () => {
    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([])

    const getChannels = () => {
        axios.get('/get/channelList')
            .then((res) => {
                setChannels(res.data)
            })
    }

    useEffect(() =>  {
        getChannels()

        const channel = pusher.subscribe('channels');
        channel.bind('newChannel', function (data) {
            getChannels()
        });

    }, [])
    

    const handleAddChannel = (e) => {
        e.preventDefault()

        const channelName = prompt('Enter a new channel name')

        if (channelName) {
            axios.post('/new/channel', {
                channelName: channelName
            })  

        }
    }
    

    const [icon, showIcon] = useState(true);
   
    const [hide, hideChannel] = useState(false);
    const handleShow = (e) => {
        e.preventDefault()
        hideChannel(prevHide => !prevHide);
        console.log(hide);
    }
    return (
        <div className='sidebar' >
            <div className="sidebar__top">
                <h1>ChatSpace</h1>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon onClick={handleShow} className='sidebar__expandChannel'/>
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon onClick={handleAddChannel} className='sidebar__addChannel' />
                </div>
                {!hide && (
                    <div className="sidebar__channelsList">
                    {
                        channels.map(channel => (
                            <SidebarChannel key={channel.id} id={channel.id} channelName={channel.name} />
                        ))
                    }
                
                </div>
                )}
                
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon className='sidebar__voiceIcons' fontSize='large' />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>
            <div className="sidebar__profile">
                <div className="sidebar__avatar" >
                    {icon &&(
                        <Avatar src={user.photo} 
                        onMouseOver={()=> showIcon(false)}
                        />  
                    )}   
                    {!icon && (
                        <Avatar className="icon"
                        onMouseLeave={()=> showIcon(true)}
                        onClick={() => auth.signOut()}>  <ExitToAppIcon fontSize="large" /> </Avatar>                 
                    )}
                </div>
                
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar