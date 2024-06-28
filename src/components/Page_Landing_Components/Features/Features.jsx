import React from "react";
import styles from "./Features.module.css";
import halteres from "../../../assets/Icons/halteres.png";
import nutrition from "../../../assets/Icons/dieta.png";
import expertCoaches from "../../../assets/Icons/expertCoaches.png";
import progressTracking from "../../../assets/Icons/progressTracking.png";

const Features = ({ currentLanguage }) => {
  const getTranslations = () => {
    switch (currentLanguage) {
      case 'pt':
        return {
          whyChoose: "Por que escolher a Origym?",
          personalizedPlans: "Planos de Treino Personalizados",
          personalizedPlansDesc: "Planos de treino personalizados para atender aos seus objetivos e nível de condicionamento físico.",
          expertCoaches: "Treinadores Especializados",
          expertCoachesDesc: "Receba orientação de profissionais certificados em fitness.",
          nutritionGuides: "Guias de Nutrição",
          nutritionGuidesDesc: "Planos de refeição personalizados para complementar sua rotina de exercícios.",
          progressTracking: "Rastreamento de Progresso",
          progressTrackingDesc: "Monitore seu progresso com nossas ferramentas de rastreamento avançadas."
        };
      case 'fr':
        return {
          whyChoose: "Pourquoi choisir Origym ?",
          personalizedPlans: "Programmes d'Entraînement Personnalisés",
          personalizedPlansDesc: "Programmes d'entraînement adaptés à vos objectifs et à votre niveau de forme physique.",
          expertCoaches: "Coachs Experts",
          expertCoachesDesc: "Recevez des conseils de professionnels certifiés en fitness.",
          nutritionGuides: "Guides Nutritionnels",
          nutritionGuidesDesc: "Plans de repas personnalisés pour compléter votre routine de fitness.",
          progressTracking: "Suivi des Progrès",
          progressTrackingDesc: "Suivez vos progrès avec nos outils de suivi avancés."
        };
      case 'it':
        return {
          whyChoose: "Perché scegliere Origym?",
          personalizedPlans: "Piani di Allenamento Personalizzati",
          personalizedPlansDesc: "Piani di allenamento su misura per i tuoi obiettivi e il tuo livello di forma fisica.",
          expertCoaches: "Allenatori Esperti",
          expertCoachesDesc: "Ottieni la guida di professionisti del fitness certificati.",
          nutritionGuides: "Guide Nutrizionali",
          nutritionGuidesDesc: "Piani alimentari personalizzati per completare la tua routine di fitness.",
          progressTracking: "Monitoraggio dei Progressi",
          progressTrackingDesc: "Monitora i tuoi progressi con i nostri strumenti di monitoraggio avanzati."
        };
      case 'de':
        return {
          whyChoose: "Warum Origym wählen?",
          personalizedPlans: "Personalisierte Trainingspläne",
          personalizedPlansDesc: "Maßgeschneiderte Trainingspläne, die Ihren Zielen und Ihrem Fitnessniveau entsprechen.",
          expertCoaches: "Experten-Coaches",
          expertCoachesDesc: "Lassen Sie sich von zertifizierten Fitness-Profis beraten.",
          nutritionGuides: "Ernährungsleitfäden",
          nutritionGuidesDesc: "Individuelle Ernährungspläne, die Ihr Fitnessprogramm ergänzen.",
          progressTracking: "Fortschrittsverfolgung",
          progressTrackingDesc: "Überwachen Sie Ihren Fortschritt mit unseren fortschrittlichen Tracking-Tools."
        };
      case 'es':
        return {
          whyChoose: "¿Por qué elegir Origym?",
          personalizedPlans: "Planes de Entrenamiento Personalizados",
          personalizedPlansDesc: "Planes de entrenamiento adaptados a tus objetivos y nivel de condición física.",
          expertCoaches: "Entrenadores Expertos",
          expertCoachesDesc: "Recibe orientación de profesionales certificados en fitness.",
          nutritionGuides: "Guías de Nutrición",
          nutritionGuidesDesc: "Planes de comidas personalizados para complementar tu rutina de ejercicios.",
          progressTracking: "Seguimiento de Progreso",
          progressTrackingDesc: "Monitorea tu progreso con nuestras herramientas avanzadas de seguimiento."
        };
      default:
        return {
          whyChoose: "Why Choose Origym?",
          personalizedPlans: "Personalized Workout Plans",
          personalizedPlansDesc: "Tailored workout plans to fit your goals and fitness level.",
          expertCoaches: "Expert Coaches",
          expertCoachesDesc: "Get guidance from certified fitness professionals.",
          nutritionGuides: "Nutrition Guides",
          nutritionGuidesDesc: "Custom meal plans to complement your fitness routine.",
          progressTracking: "Progress Tracking",
          progressTrackingDesc: "Monitor your progress with our advanced tracking tools."
        };
    }
  };

  const translations = getTranslations();

  return (
    <div className={styles.features}>
      <h2>{translations.whyChoose}</h2>
      <div className={styles.featureList}>
        <div className={styles.featureItem}>
          <img src={halteres} alt={translations.personalizedPlans} />
          <h3>{translations.personalizedPlans}</h3>
          <p>{translations.personalizedPlansDesc}</p>
        </div>
        <div className={styles.featureItem}>
          <img src={expertCoaches} alt={translations.expertCoaches} />
          <h3>{translations.expertCoaches}</h3>
          <p>{translations.expertCoachesDesc}</p>
        </div>
        <div className={styles.featureItem}>
          <img src={nutrition} alt={translations.nutritionGuides} />
          <h3>{translations.nutritionGuides}</h3>
          <p>{translations.nutritionGuidesDesc}</p>
        </div>
        <div className={styles.featureItem}>
          <img src={progressTracking} alt={translations.progressTracking} />
          <h3>{translations.progressTracking}</h3>
          <p>{translations.progressTrackingDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default Features;