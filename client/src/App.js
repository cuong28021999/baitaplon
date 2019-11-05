import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

// import components
import NavBar from './components/NavBar'

// import pages
import About from './pages/About'
import Home from './pages/Home'
import Register from './pages/Register'
import Classes from './pages/Classes'
import YourClass from './pages/YourClass'
import EditExam from './pages/EditExam'

// import contexts
import { LoginProvider } from './contexts/Login'

import withAuth from './components/withAuth'
import withTeacher from './components/withTeacher'

class App extends Component {
    render() {
        return (
            <LoginProvider>
                <Router>
                    <div className="App">
                        <NavBar />
                        <Switch>
                            <Route exact path="/about" component={withAuth(About)} />
                            <Route exact path="/class" component={withAuth(Classes)} />
                            <Route exact path="/class/:classId" component={withAuth(withTeacher(YourClass))}/>
                            <Route exact path="/class/:classId/exam/:examId" component={withAuth(withTeacher(EditExam))}/>
                            <Route exact path="/register">
                                <Register />
                            </Route>
                            <Route exact path="/" component={withAuth(Home)} />
                        </Switch>
                    </div>
                </Router>
            </LoginProvider>
        )
    }
}

export default App;