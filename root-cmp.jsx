import { AppHome } from './pages/app-home.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppKeep } from './pages/app-keep.jsx'
import { AppEmail } from './pages/app-email.jsx'
import { AppBook } from './pages/app-book.jsx'
// import { AppFooter } from './cmps/app-footer.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router> 
        <AppHeader/>
        <section className="app">
        <Switch>
        
        <Route path="/book" component={AppBook} />
        <Route path="/email" component={AppEmail} />
        <Route path="/keep" component={AppKeep} />
        <Route path="/" component={AppHome} />
        </Switch>
    </section>
    {/* <AppFooter/> */}
    </Router>
}
