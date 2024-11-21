import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: 'black', 
      color: 'white', 
      padding: '20px',
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>SysLearn</div>
      <div>
        <Link href="/login" style={{color: 'white', margin: '0 10px'}}>
          Connexion
        </Link>
        <Link href="/signup" style={{color: 'white', margin: '0 10px'}}>
          Inscription
        </Link>
        <Link href="/dashboard" style={{color: 'white', margin: '0 10px'}}>
          Tableau de bord
        </Link>
      </div>
    </nav>
  )
}