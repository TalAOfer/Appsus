import { EmailList } from "../cmps/mail-list.jsx";


export class MailDisplay extends React.Component {
    state = {

    }

    componentDidMount() {

    }

    render() {
        console.log(this.props);
        
    
        const {emails} = this.props
        return <section className="mail-display">
            <EmailList emails={emails}/>
        </section>
    }

}