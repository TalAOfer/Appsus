import { EmailFilter } from "../apps/mail/cmps/mail-filter.jsx";
// import { GoogleBookApi } from "../apps/book/cmps/book-api.jsx";
import { BookFilter } from "../apps/book/cmps/book-filter.jsx"; 

const { Link, NavLink, withRouter } = ReactRouterDOM

export class _AppHeader extends React.Component {

    render() {
        const { pathname } = this.props.location
        const showSearchEmail = pathname.includes('email') ? true : false
        const showSearchBook = pathname.includes('book') ? true : false

        return <header className="app-header">
            <h1> Appsus </h1>
            {showSearchEmail &&<EmailFilter />}
            {/* {showSearchBook &&<GoogleBookApi />} */}
            {showSearchBook &&<BookFilter />}
            
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
