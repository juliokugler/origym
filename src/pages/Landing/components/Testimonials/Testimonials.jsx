//React
import React from "react";

//Styles
import styles from "./Testimonials.module.css";

//Icons
import { FaStar } from "react-icons/fa";

//Images
import johnDoe from "./avatar6.jpg";
import janeSmith from "./avatar5.jpg";
import mikeJohnson from "./avatar.png";

const Testimonials = ( currentLanguage) => {
  let title, subtitle, testimonials;

  
  switch (currentLanguage.currentLanguage) {
    case "pt":
      title = "Histórias de Sucesso";
      subtitle = "Ouça de nossos membros satisfeitos";
      testimonials = [
        {
          img: johnDoe,
          alt: "John Doe",
          text: "A Origym me ajudou a perder 20 quilos e ganhar músculos. Os treinadores são incríveis!",
          name: "John Doe",
        },
        {
          img: janeSmith,
          alt: "Jane Smith",
          text: "Os planos personalizados e os guias de nutrição foram um divisor de águas para mim.",
          name: "Jane Smith",
        },
        {
          img: mikeJohnson,
          alt: "Mike Johnson",
          text: "Alcancei meus objetivos de condicionamento físico mais rápido do que imaginava graças ao suporte da Origym.",
          name: "Mike Johnson",
        },
      ];
      break;
    case "es":
      title = "Historias de Éxito";
      subtitle = "Escucha a nuestros miembros satisfechos";
      testimonials = [
        {
          img: johnDoe,
          alt: "John Doe",
          text: "Origym me ayudó a perder 20 libras y ganar músculo. ¡Los entrenadores son increíbles!",
          name: "John Doe",
        },
        {
          img: janeSmith,
          alt: "Jane Smith",
          text: "Los planes personalizados y las guías de nutrición cambiaron las reglas del juego para mí.",
          name: "Jane Smith",
        },
        {
          img: mikeJohnson,
          alt: "Mike Johnson",
          text: "Alcancé mis objetivos de fitness más rápido de lo que imaginaba gracias al apoyo de Origym.",
          name: "Mike Johnson",
        },
      ];
      break;
    case "it":
      title = "Storie di Successo";
      subtitle = "Ascolta i nostri membri soddisfatti";
      testimonials = [
        {
          img: johnDoe,
          alt: "John Doe",
          text: "Origym mi ha aiutato a perdere 20 chili e a guadagnare muscoli. Gli allenatori sono fantastici!",
          name: "John Doe",
        },
        {
          img: janeSmith,
          alt: "Jane Smith",
          text: "I piani personalizzati e le guide nutrizionali sono stati un punto di svolta per me.",
          name: "Jane Smith",
        },
        {
          img: mikeJohnson,
          alt: "Mike Johnson",
          text: "Ho raggiunto i miei obiettivi di fitness più velocemente di quanto immaginassi grazie al supporto di Origym.",
          name: "Mike Johnson",
        },
      ];
      break;
    case "de":
      title = "Erfolgsgeschichten";
      subtitle = "Hören Sie von unseren zufriedenen Mitgliedern";
      testimonials = [
        {
          img: johnDoe,
          alt: "John Doe",
          text: "Origym hat mir geholfen, 20 Pfund abzunehmen und Muskeln aufzubauen. Die Trainer sind fantastisch!",
          name: "John Doe",
        },
        {
          img: janeSmith,
          alt: "Jane Smith",
          text: "Die personalisierten Pläne und Ernährungshinweise waren für mich ein Wendepunkt.",
          name: "Jane Smith",
        },
        {
          img: mikeJohnson,
          alt: "Mike Johnson",
          text: "Ich habe meine Fitnessziele schneller erreicht, als ich es mir vorgestellt habe, dank der Unterstützung von Origym.",
          name: "Mike Johnson",
        },
      ];
      break;
    case "fr":
      title = "Histoires de Réussite";
      subtitle = "Écoutez nos membres satisfaits";
      testimonials = [
        {
          img: johnDoe,
          alt: "John Doe",
          text: "Origym m'a aidé à perdre 20 livres et à prendre du muscle. Les entraîneurs sont incroyables!",
          name: "John Doe",
        },
        {
          img: janeSmith,
          alt: "Jane Smith",
          text: "Les plans personnalisés et les guides nutritionnels ont changé la donne pour moi.",
          name: "Jane Smith",
        },
        {
          img: mikeJohnson,
          alt: "Mike Johnson",
          text: "J'ai atteint mes objectifs de fitness plus rapidement que je ne l'imaginais grâce au soutien d'Origym.",
          name: "Mike Johnson",
        },
      ];
      break;
    default:
      title = "Success Stories";
      subtitle = "Hear from our satisfied members";
      testimonials = [
        {
          img: johnDoe,
          alt: "John Doe",
          text: "Origym helped me lose 20 pounds and gain muscle. The coaches are amazing!",
          name: "John Doe",
        },
        {
          img: janeSmith,
          alt: "Jane Smith",
          text: "The personalized plans and nutrition guides were a game changer for me.",
          name: "Jane Smith",
        },
        {
          img: mikeJohnson,
          alt: "Mike Johnson",
          text: "I achieved my fitness goals faster than I imagined thanks to Origym's support.",
          name: "Mike Johnson",
        },
      ];
  }

  return (
    <div className={styles.testimonials}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <div className={styles.testimonialList}>
        {testimonials.map((testimonial, index) => (
          <div className={styles.testimonialItem} key={index}>
            <img src={testimonial.img} alt={testimonial.alt} />
            <div className={styles.testimonialContent}>
              <div className={styles.stars}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p>{testimonial.text}</p>
              <span>{testimonial.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;