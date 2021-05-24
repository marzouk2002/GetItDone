import React from 'react'

function Bands() {
    
    const mounseEntB1 = () => {
        document.querySelector('.main').classList.add("open-band-1")
    }

    const mounseLeavB1 = () => {
        document.querySelector('.main').classList.remove("open-band-1")
    }

    return (
        <div className='band-wrapper'>
            <div onMouseEnter={mounseEntB1} onMouseLeave={mounseLeavB1} className="band-1">
                <div className="band-1-content">
                    <p>Account</p>
                </div>
            </div>
        </div>
    )
}

export default Bands