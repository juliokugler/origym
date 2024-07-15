//React
import React from 'react';

//Styles
import styles from './Hero.module.css';

//Dependencies
import { useNavigate } from 'react-router-dom';

const Hero = ({currentLanguage, isMobile, t}) => {
  const navigate = useNavigate();
  let heroText = "";
  let subText = "Track your workouts, nutrition, sleep and much more!";

console.log(currentLanguage)

  switch (currentLanguage) {
    case currentLanguage == "en":
      heroText = (
        <h1>
          START YOUR <span>FITNESS</span>
          <br />
          <span>JOURNEY</span> NOW
          <br />
          WITH <span>ORIGYM</span>.
        </h1>
      );
      break;
    case "fr":
      heroText = (
        <h1>
          COMMENCEZ VOTRE <span>PARCOURS</span>
          <br />
          <span>FITNESS</span> MAINTENANT
          <br />
          AVEC <span>ORIGYM</span>.
        </h1>
      );
      subText = "Suivez vos entraînements, votre nutrition, votre sommeil et bien plus encore!";
      break;
    case "it":
      heroText = (
        <h1>
          INIZIA IL TUO <span>PERCORSO</span>
          <br />
          <span>FITNESS</span> ORA
          <br />
          CON <span>ORIGYM</span>.
        </h1>
      );
      subText = "Traccia i tuoi allenamenti, la tua nutrizione, il tuo sonno e molto altro ancora!";
      break;
    case "pt":
      heroText = (
        <h1>
          INICIE SUA <span>JORNADA</span>
          <br />
          <span>FITNESS</span> AGORA
          <br />
          COM A <span>ORIGYM</span>.
        </h1>
      );
      subText = "Acompanhe seus treinos, nutrição, sono e muito mais!";
      break;
    case "de":
      heroText = (
        <h1>
          STARTEN SIE IHRE <span>FITNESS</span>
          <br />
          <span>REISE</span> JETZT
          <br />
          MIT <span>ORIGYM</span>.
        </h1>
      );
      subText = "Verfolgen Sie Ihre Workouts, Ernährung, Schlaf und vieles mehr!";
      break;
    case "es":
      heroText = (
        <h1>
          COMIENZA TU <span>VIAJE</span>
          <br />
          <span>FITNESS</span> AHORA
          <br />
          CON <span>ORIGYM</span>.
        </h1>
      );
      subText = "Realiza un seguimiento de tus entrenamientos, nutrición, sueño y mucho más!";
      break;
    default:
      heroText = (
        <h1>
          START YOUR <span>FITNESS</span>
          <br />
          <span>JOURNEY</span> NOW
          <br />
          WITH <span>ORIGYM</span>.
        </h1>
      );
  }

  return (
    <div className={isMobile ? styles.hero_mobile : styles.hero}>
      <div className={styles.heroText}>
        {heroText}
        <p>{subText}</p>
        <button onClick={() => navigate("/register")} className="button">
          <h3>{t("joinNow")}</h3>
        </button>
      </div>
    </div>
  );
}

export default Hero;