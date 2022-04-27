const { Link } = ReactRouterDOM;

export function EmailsPreview({ email }) {

  return (
      <article className='email-preview'>
        <h2>{email.subject}</h2>
        <h3>{email.body}</h3>
        <h3>{email.from}</h3>
      </article>
   
  );
}