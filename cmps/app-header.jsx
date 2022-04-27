const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader() {
    return <header className="app-header">
        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/email">Mister Email</NavLink>
            <NavLink to="/keep">Miss Keep</NavLink>
            <NavLink to="/book" >Miss Books</NavLink>
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)