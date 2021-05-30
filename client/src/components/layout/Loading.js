import React from 'react'
import '../../styles/loading.css'

export default function Loading() {
    return (
        <div className="containner">
            <div className="wrapper">
                <div className="bar" id="bar1"></div>
                <div className="bar" id="bar2"></div>
                <div className="bar" id="bar3"></div>
                <div className="bar" id="bar4"></div>
                <div className="bar" id="bar5"></div>
            </div>
        </div>
    )
}
