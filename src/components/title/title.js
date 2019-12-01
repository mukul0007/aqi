import React from 'react';
import './title.scss';
import flag from './flag.png';

export default ({ updatedAt }) => (
    <div className="aqi-title">
        <img src={flag} alt="flag" />
        <div className="aqi-title__text">
            <div className="aqi-title__text--main">Air Quality index</div>
            { updatedAt && <div className="aqi-title__text--sub">Last Updated : {updatedAt}</div> }
            <div className="aqi-title__text--sub2">&lt;Mukul Katal /&gt;</div>
        </div>
    </div>
);
