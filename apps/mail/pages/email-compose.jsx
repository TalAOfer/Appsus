import { emailService } from "../services/mail.service.js";

export class EmailCompose extends React.Component {
    state = {
        email: {
            to: '',
            subject: '',
            body: '',
            isRead: true
        },
    }

    handleChange = ({ target }) => {
        const { name } = target
        this.setState((prevState) => ({ email: { ...prevState.email, [name]: target.value } }))
    }

    onSave = (ev) => {
        ev.preventDefault()
        const { email } = this.state
        emailService.saveEmail(email).then(() => {
            this.props.history.push('/email')
        })
        // console.log(email);
    }

    onGoBack = () => {
        this.props.history.push("/email");
    };


    render() {
        const { email } = this.state
        return (
            <section className='email-compose'>
                <button className="compose-btn-cls" onClick={this.onGoBack}>X</button>
                <form onSubmit={this.onSave}>
                    <label htmlFor='to'>To: </label>
                    <input
                        type='email'
                        id='to'
                        name='to'
                        value={email.to}
                        onChange={this.handleChange}
                        placeholder='Email'
                    />

                    <label htmlFor='subject'>Subject: </label>
                    <input
                        type='text'
                        id='subject'
                        name='subject'
                        value={email.subject}
                        onChange={this.handleChange}
                        placeholder='Subject'
                    />

                    <label htmlFor='body'>Body:</label>
                    <textarea
                        id='body'
                        name='body'
                        value={email.body}
                        onChange={this.handleChange}
                        rows='10'
                        cols='30'
                    ></textarea>


                    <input className='send-btn' type='submit' value='Send' />
                </form>
            </section>
        )
    }
}


// /            <section className="email-compose">
// <div><span className="compose-span">To: </span>{`${}`}</div> <hr />
// <div><span className="compose-span">From:  </span>{`${}`}:</div> <hr />
// <div><span className="compose-span">Subject: </span>{` ${}`}:</div> <hr />
// <div className="compose-body">{`${email.body}`}</div>
// </section>