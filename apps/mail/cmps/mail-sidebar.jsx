const { NavLink } = ReactRouterDOM

export class MailSideBar extends React.Component {
    state = {}

    componentDidMount() { }

    render() {
        const { status } = this.props
        return <section className="mail-sidebar">
            <div className="sidebar-btn-container">
                <button className="sidbar-btn">+ Compose</button>
            </div>
            <ul className="sidbar-list">
                <NavLink to="/email/inbox" ><li onClick={() => { status('inbox') }} className="filter-btn"> Inbox </li></NavLink>
                <NavLink to="/email/starred" ><li onClick={() => { status('starred') }} className="filter-btn"> Starred </li></NavLink>
                <NavLink to="/email/sent" ><li onClick={() => { status('sent') }} className="filter-btn"> Sent Mail </li></NavLink>
                <NavLink to="/email/Drafts" ><li onClick={() => { status('Drafts') }} className="filter-btn"> Drafts </li></NavLink>
                <NavLink to="/email/trash" ><li onClick={() => { status('trash') }} className="filter-btn"> Trash </li></NavLink>
            </ul>
            <div className="sidebar-precantage">33%</div>
        </section>
    }

}