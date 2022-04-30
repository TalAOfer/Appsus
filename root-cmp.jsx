import { AppHome } from './pages/app-home.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { KeepApp } from './pages/keep-app.jsx'
import { AppEmail } from './pages/email-app.jsx'

import { BookApp } from './pages/book-app.jsx'
import { BookDetails } from './apps/book/pages/book-details.jsx'
// import { BookEdit } from './pages/book-edit.jsx'
// import { UserMsg } from './cmps/user-msg.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <AppHeader />
        <section className="app">
            <Switch>
                {/* <Route path='/book/edit/:bookId?' component={BookEdit} /> */}
                <Route path='/book/:bookId' component={BookDetails} />
                <Route path='/book' component={BookApp} />
                <Route path="/email" component={AppEmail} />
                <Route path="/keep" component={KeepApp} />
                <Route path="/" component={AppHome} />
            </Switch>
        </section>
        {/* <AppFooter/> */}
    </Router>
}
