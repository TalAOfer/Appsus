import { EmailsPreview } from "../cmps/mail-preview.jsx";

export function EmailList({ emails, isReadUpdate, removeEmail }) {


    return (
        <section className="email-list">
            {emails.map((email) => (<EmailsPreview key={email.id} email={email} isReadUpdate={isReadUpdate} removeEmail={removeEmail} />))}
        </section>
    );
}

// INSERT LOADER...


