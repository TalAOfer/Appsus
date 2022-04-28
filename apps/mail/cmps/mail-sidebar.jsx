import { eventBusService } from "../../../services/event-bus-service.js";

const { NavLink } = ReactRouterDOM

export class MailSideBar extends React.Component {

    state = {
        unreadEmailsCount: ''
    }

    componentDidMount() {
        this.removeEvent = eventBusService.on('unread-emails', (unreadEmailsCount) => {
            this.setState({ unreadEmailsCount })
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    newEmailAdd = (email) => {
        console.log('New Email', email);
    }

    render() {
        const { status } = this.props
        const { unreadEmailsCount } = this.state
         const unreadEmailsCountFormat = Intl.NumberFormat("en-GB", { style: "percent"}).format(unreadEmailsCount);
        return <section className="mail-sidebar">
            <div className="sidebar-btn-container">
                
                <NavLink to={`/email/new_email`}><button className="sidbar-btn">+ Compose</button></NavLink>
            </div>
            <ul className="sidbar-list">
                <NavLink to="/email/inbox" ><li onClick={() => { status('inbox') }} className="filter-btn"> Inbox </li></NavLink>
                <NavLink to="/email/starred" ><li onClick={() => { status('starred') }} className="filter-btn"> Starred </li></NavLink>
                <NavLink to="/email/sent" ><li onClick={() => { status('sent') }} className="filter-btn"> Sent Mail </li></NavLink>
                <NavLink to="/email/Drafts" ><li onClick={() => { status('Drafts') }} className="filter-btn"> Drafts </li></NavLink>
                <NavLink to="/email/trash" ><li onClick={() => { status('trash') }} className="filter-btn"> Trash </li></NavLink>
            </ul>
            <div className="sidebar-precantage">{unreadEmailsCountFormat}</div>
        </section>
    }

}