import { useState } from 'react'
import './App.css'
import { getShortName } from './helpers';
import { FaPlus, FaCaretDown, FaHashtag, FaRegCopy } from 'react-icons/fa';
import { GrTextAlignFull } from 'react-icons/gr';
import { FiAtSign } from 'react-icons/fi';
import { BiMessageRounded } from 'react-icons/bi';

function App() {
  const [ channels, setChannels ] = useState([
    { id: crypto.randomUUID(), name: 'Alpha Channel' },
    { id: crypto.randomUUID(), name: 'Cooking Project' },
    { id: crypto.randomUUID(), name: 'Smart Phone' },
  ]);

  const [ colors ] = useState([ 'bg-green-600', 'bg-blue-500', 'bg-pink-700', 'bg-yellow-600' ]);
  const [ selectedChannel, setSelectedChannel ] = useState(0);
  const [ starredExpanded, setStarredExpanded ] = useState( true );
  const [ channelsExpanded, setChannelsExpanded ] = useState( true );
  const [ messagesExpanded, setMessagesExpanded ] = useState( true );

  return (
    <div className='app absolute flex w-full h-full inset-0 bg-[var(--color-base)]'>
      <ul className='channel-container'>
        { channels.map((ch, p) => (
          <li key={ ch.id } onClick={ () => setSelectedChannel(p) }
            className={'channel-item ' + colors[p] + (p === selectedChannel ? ' active' : '')}>
            { getShortName(ch.name) }
          </li>
        ))}
      
        <li key='channel-add' className='channel-item text-xl'> <FaPlus /> </li> 
      </ul>

      <section className='sub-channels'>
        {/* Channel name */}
        <div className="channel-name">
          <span>{ channels[ selectedChannel ].name }</span>
        </div>
        
        {/* Summary */}
        <ul className='summary'>
          <li className='font-bold link'> <GrTextAlignFull /> All unread </li>
          <li className='link'> <BiMessageRounded /> Threads </li>
          <li className='link'> <FiAtSign /> Mentions &amp; reactions </li>
          <li className='link'> <FaRegCopy /> Drafts </li>
        </ul>

        {/* Starred and Channels */}
        <div className="sub-channels-content">
          <div className={'accordion ' + ( starredExpanded ? 'expanded' : '' )}>
            <span onClick={ () => setStarredExpanded( !starredExpanded ) }>
              <FaCaretDown /> Starred
            </span>

            <ul>
              <li className='link'><FaHashtag/> Announcements</li>
              <li className='link'><FaHashtag/> social-media</li>
              <li className='link'><FaHashtag/> triage-issues</li>
            </ul>
          </div>
         
          <div className={'accordion ' + ( channelsExpanded ? 'expanded' : '' )}>
            <span onClick={ () => setChannelsExpanded( !channelsExpanded ) }>
              <FaCaretDown /> Channels
            </span>

            <ul>
              <li className='link'><FaHashtag/> accounting</li>
              <li className='link'><FaHashtag/> design-crit</li>
              <li className='link'><FaHashtag/> design-team</li>
            </ul>
          </div>
          
          <div className={'accordion ' + ( messagesExpanded ? 'expanded' : '' )}>
            <span onClick={ () => setMessagesExpanded( !messagesExpanded ) }>
              <FaCaretDown /> Direct messages
            </span>

            <ul>
              <li className='link'><FaHashtag/> Slackbot</li>
              <li className='link'><FaHashtag/> Someone (you)</li>
              <li className='link'><FaHashtag/> John Doe</li>
            </ul>
          </div>

        </div>
      </section>

      <section className='chat bg-white text-black'>
        Chat section
      </section>
    </div>
  )
}

export default App
