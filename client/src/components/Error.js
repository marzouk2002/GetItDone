import React from 'react'
import Banner from './layout/Banner'
import Header from './layout/Header'
import Menu from './layout/Menu'

export default function Error() {
    return (
        <>
           <Header classes="alt"/>
           <Menu/>
           <Banner status={false}/>
        </>
    )
}
