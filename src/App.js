/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CustomRouter from './common/CustomRouter'
import { Main } from './common/Layout'
import NotFound from './common/NotFound'
import PrivateRouter from './common/privateRouter'
import AuthPage from './features/Auth/AuthPage'
import ChatPage from './features/Chat-rom'
import { HomePage } from './features/Home'

function App() {
    return (
        <Router>
            <Main>
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <CustomRouter path="/auth">
                        <AuthPage />
                    </CustomRouter>
                    <PrivateRouter path="/chatPage">
                        <ChatPage />
                    </PrivateRouter>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Main>
        </Router>
    )
}

export default App
