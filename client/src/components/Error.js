import React from 'react'
import Banner from './layout/Banner'
import Header from './layout/Header'

export default function Error() {
    return (
        <>
           <Header classes="alt"/>
           <Banner status={false}/>
        </>
    )
}
