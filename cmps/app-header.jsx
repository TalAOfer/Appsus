import { EmailFilter } from "../apps/mail/cmps/mail-filter.jsx";

const { Link, NavLink, withRouter } = ReactRouterDOM

export class _AppHeader extends React.Component {

    render() {
        const { pathname } = this.props.location
        const showSearch = pathname.includes('email') ? true : false
        return <header className="app-header">
            <h1> Appsus </h1>
            {showSearch &&<EmailFilter />}
            <nav>
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/email/inbox">Mister Email</NavLink>
                <NavLink to="/keep">Miss Keep</NavLink>
                <NavLink to="/book" >Miss Books</NavLink>
            </nav>
        </header>
    }
}

export const AppHeader = withRouter(_AppHeader)
