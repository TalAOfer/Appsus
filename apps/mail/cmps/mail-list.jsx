import { EmailsPreview } from "../cmps/mail-preview.jsx";

export function EmailList({ emails }) {


  return (
    <section className="email-list">
      {emails.map((email) => (<EmailsPreview key={email.id} email={email} />))}
    </section>
  );
}

// INSERT LOADER...
