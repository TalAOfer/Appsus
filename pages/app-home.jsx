const { Link, NavLink, withRouter } = ReactRouterDOM

export function AppHome () {
    return <section className="app-home">
      <Link to="/keep"> <div> Keep </div> </Link>
      <Link to="/email"> <div> Email </div> </Link> 
      <Link to="/book"> <div> Book </div> </Link>
        
    </section>
}

