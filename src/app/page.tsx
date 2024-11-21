import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div 
        className="hero-section"
        style={{
          backgroundImage: 'url("/hero-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div>
          <h1>Bienvenue chez SysLearn</h1>
          <p>Votre plateforme d'apprentissage innovante</p>
        </div>
      </div>

      <div className="company-images">
        <Image 
          src="/company1.jpg" 
          alt="Entreprise 1" 
          width={250} 
          height={250} 
          className="circle-image"
        />
        <Image 
          src="/company2.jpg" 
          alt="Entreprise 2" 
          width={250} 
          height={250} 
          className="circle-image"
        />
        <Image 
          src="/company3.jpg" 
          alt="Entreprise 3" 
          width={250} 
          height={250} 
          className="circle-image"
        />
      </div>
    </main>
  )
}