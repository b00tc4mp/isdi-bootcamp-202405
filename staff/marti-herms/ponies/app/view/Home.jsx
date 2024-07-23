import Header from './home/Header';
import Body from './home/Body';
import Footer from './home/Footer';

import './Home.css';

import { useState } from 'react';

const Home = ({ onLogout }) => {
    const [refreshStamp, setRefreshStamp] = useState(null)
    const [feed, setFeed] = useState('home')

    const handleHomeFeed = () => {
        setFeed('home');
    }

    const handleSearchUser = (username) => {
        setFeed(username)
    }

    const handlePostCreatedOrCanceled = () => {
        setRefreshStamp(Date.now());
        setFeed('home')
    }

    const handleUserFollow = () => {
        setRefreshStamp(Date.now())
    }

    const handleFollowedFeed = () => {
        setFeed('followed');
    }

    const handleSavedPostsFeed = () => {
        setFeed('saved');
    }

    return <>
        <Header onLogout={onLogout} />

        <Body refreshStamp={refreshStamp} feed={feed} onProfile={handleSearchUser} onFollow={handleUserFollow} />

        <Footer onHomeButtonClick={handleHomeFeed}
            onSearch={handleSearchUser}
            onPostCreated={handlePostCreatedOrCanceled}
            onFollowedButtonClick={handleFollowedFeed}
            onSavedPostsButtonClick={handleSavedPostsFeed} />
    </>

}

export default Home