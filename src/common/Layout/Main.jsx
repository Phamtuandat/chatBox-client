import React from 'react'
import Header from '../Header'

export function Main({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
