import { AppHome } from './pages/app-home.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router> 
        <AppHeader/>
        <section className="app">
        <Switch>
        
        <Route path="/" component={AppHome} />
        </Switch>
    </section>
    <AppFooter/>
    </Router>
}
