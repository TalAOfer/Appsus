const { Link, NavLink, withRouter } = ReactRouterDOM

export function AppHome() {
  return <section className="app-home">
    <Link className="home-page-keep-svg" to="/keep"> <div className="home-page-txt"> </div> </Link>
    <Link className="home-page-email-svg" to="/email"> <div className="home-page-txt"> </div> </Link>
    <Link className="home-page-book-svg" to="/book"> <div className="home-page-txt"> </div> </Link>

  {/* <pre className="creators">{`   Creators: 
  
  Tal Ofer
  & 
  Eran Avichzer`}</pre> */}
  </section>
}


// <img className="home-book-img" src="assets/svg/book.svg" alt="SVG"/>