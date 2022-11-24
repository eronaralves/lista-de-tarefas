import styles from './Header.module.css'

// Assets
import Logo from '../../assets/logo-todo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} alt="logo da todo"/>
    </header>
  )
}