
export class EmailFilter extends React.Component {
//     state = {
//         email: {
//             to: '',
//             subject: '',
//             body: '',
//             isRead: true
//         },
//     }

//     handleChange = ({ target }) => {
//         const { name } = target
//         this.setState((prevState) => ({ email: { ...prevState.email, [name]: target.value } }))
//     }

//     onSave = (ev) => {
//         ev.preventDefault()
//         const { email } = this.state
//         emailService.saveEmail(email).then(() => {
//             this.props.history.push('/email')
//         })
//         // console.log(email);
//     }

//     onGoBack = () => {
//         this.props.history.push("/email");
//     };


    render() {
        // const { email } = this.state
        return (
            <section className='email-filter'>
                Hello
                <button className="compose-btn-cls" onClick={this.onGoBack}>X</button>
                <form onSubmit={this.onSave}>
                    <input
                        type='search'
                        id='to'
                        name='to'
                        // value={email.to}
                        // onChange={this.handleChange}
                        placeholder='Search'
                    />
                    <input className='send-btn' type='submit' value='Search' />
                </form>
            </section>
        )
    }
}
