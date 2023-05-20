import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
  <div className="not-found">
  <h1 className="srry">Sorry, this page isn't available.</h1>
  <p className="m-info">The link you followed may be broken, or the page may have been removed.
      <Link to="/" className="g-txt"> Go back to Lisp.</Link>
  </p>
  <Link to="/" className="g-home">Go to Home</Link>
</div>
  )
}

export default Notfound