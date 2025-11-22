import { Link } from 'react-router-dom'
import style from './style.module.css'

const NotFound = () => {
  return (
    <div className={style.notfoundContainer}>
      <h1 className={style.notfoundTitle}>404</h1>
      <p className={style.notfoundText}>Oops! Page not found.</p>

      <Link to="/" className={style.notfoundButton}>
        Go to Dashboard
      </Link>
    </div>
  )
}

export default NotFound