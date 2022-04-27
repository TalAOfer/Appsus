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
                <li onClick={() => { status('inbox') }}>Inbok</li>
                <li onClick={() => { status('starred') }}>Starred</li>
                <li onClick={() => { status('sent') }}>Sent Mail</li>
                <li onClick={() => { status('Drafts') }}>Drafts</li>
                <li onClick={() => { status('trash') }}>Trash</li>

            </ul>
            <div className="sidebar-precantage">33%</div>
        </section>
    }

}