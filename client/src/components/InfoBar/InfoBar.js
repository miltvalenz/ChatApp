import React from 'react';

import './InfoBar.css';

const InfoBar = () => {
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onLineIcon" src={onLineIcon} alt="onLineIcon"/>
            <h3>roomName</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="closeIcon"/></a>
        </div>
    </div>
};

export default InfoBar;