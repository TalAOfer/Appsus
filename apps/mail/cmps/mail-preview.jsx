const { Link } = ReactRouterDOM;

export function EmailsPreview({ email }) {

    const fromName = email.from.substring(0, email.from.indexOf("@", 0))
    const shortBody = `${email.body.substring(0, 50)}...`

    return (
        <article className='email-preview'>
            <p className="mail-name">{fromName}</p>
            <div className="txt-container">
                <p className="mail-subject">{email.subject}</p>
                <p className="mail-body">{shortBody}</p>
            </div>
            <p className="mail-from">{email.receivedAt}</p>

        </article>

    );
}