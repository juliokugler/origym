//React
import React, { useState } from "react";

//Styles
import styles from "./Pricing.module.css";

//Icons
import { FaMedal, FaTrophy, FaCrown } from "react-icons/fa";

const Pricing = ({currentLanguage}) => {
  const [activePlan, setActivePlan] = useState("Pro");

  const handleMouseEnter = (plan) => {
    setActivePlan(plan);
  };

  const getTranslations = () => {
    switch (currentLanguage) {
      case 'pt':
        return {
          choosePlan: "Escolha seu Plano",
          affordableOptions: "Opções acessíveis para todos",
          basicPlan: "Plano Básico",
          free: "Grátis",
          basicPlanFeatures: [
            "Acesso a planos de treino básicos",
            "Rastreamento de progresso"
          ],
          tryNow: "Experimente Agora",
          proPlan: "Plano Pro",
          proPlanPrice: "R$19,99/mês",
          proPlanFeatures: [
            "Treinamento personalizado",
            "Rastreamento avançado",
            "Guias de nutrição"
          ],
          buyNow: "Comprar Agora",
          premiumPlan: "Plano Premium",
          premiumPlanPrice: "R$29,99/mês",
          premiumPlanFeatures: [
            "Todas as funcionalidades do Plano Pro",
            "Conteúdo exclusivo",
            "Treinamento individual"
          ]
        };
      case 'fr':
        return {
          choosePlan: "Choisissez votre plan",
          affordableOptions: "Options abordables pour tous",
          basicPlan: "Plan Basique",
          free: "Gratuit",
          basicPlanFeatures: [
            "Accès aux plans d'entraînement basiques",
            "Suivi des progrès"
          ],
          tryNow: "Essayez Maintenant",
          proPlan: "Plan Pro",
          proPlanPrice: "$19,99/mois",
          proPlanFeatures: [
            "Coaching personnalisé",
            "Suivi avancé",
            "Guides nutritionnels"
          ],
          buyNow: "Acheter Maintenant",
          premiumPlan: "Plan Premium",
          premiumPlanPrice: "$29,99/mois",
          premiumPlanFeatures: [
            "Toutes les fonctionnalités du Plan Pro",
            "Contenu exclusif",
            "Coaching individuel"
          ]
        };
      case 'it':
        return {
          choosePlan: "Scegli il tuo piano",
          affordableOptions: "Opzioni convenienti per tutti",
          basicPlan: "Piano Base",
          free: "Gratuito",
          basicPlanFeatures: [
            "Accesso ai piani di allenamento base",
            "Monitoraggio dei progressi"
          ],
          tryNow: "Prova Ora",
          proPlan: "Piano Pro",
          proPlanPrice: "$19,99/mese",
          proPlanFeatures: [
            "Coaching personalizzato",
            "Monitoraggio avanzato",
            "Guide nutrizionali"
          ],
          buyNow: "Acquista Ora",
          premiumPlan: "Piano Premium",
          premiumPlanPrice: "$29,99/mese",
          premiumPlanFeatures: [
            "Tutte le funzionalità del Piano Pro",
            "Contenuti esclusivi",
            "Coaching individuale"
          ]
        };
      case 'de':
        return {
          choosePlan: "Wählen Sie Ihren Plan",
          affordableOptions: "Erschwingliche Optionen für alle",
          basicPlan: "Basisplan",
          free: "Kostenlos",
          basicPlanFeatures: [
            "Zugang zu Basis-Trainingsplänen",
            "Fortschrittsverfolgung"
          ],
          tryNow: "Jetzt ausprobieren",
          proPlan: "Pro Plan",
          proPlanPrice: "$19,99/Monat",
          proPlanFeatures: [
            "Personalisierte Betreuung",
            "Erweitertes Tracking",
            "Ernährungsleitfäden"
          ],
          buyNow: "Jetzt kaufen",
          premiumPlan: "Premium Plan",
          premiumPlanPrice: "$29,99/Monat",
          premiumPlanFeatures: [
            "Alle Funktionen des Pro Plans",
            "Exklusive Inhalte",
            "Einzelcoaching"
          ]
        };
      case 'es':
        return {
          choosePlan: "Elige tu Plan",
          affordableOptions: "Opciones asequibles para todos",
          basicPlan: "Plan Básico",
          free: "Gratis",
          basicPlanFeatures: [
            "Acceso a planes de entrenamiento básicos",
            "Seguimiento del progreso"
          ],
          tryNow: "Prueba Ahora",
          proPlan: "Plan Pro",
          proPlanPrice: "$19,99/mes",
          proPlanFeatures: [
            "Entrenamiento personalizado",
            "Seguimiento avanzado",
            "Guías de nutrición"
          ],
          buyNow: "Comprar Ahora",
          premiumPlan: "Plan Premium",
          premiumPlanPrice: "$29,99/mes",
          premiumPlanFeatures: [
            "Todas las características del Plan Pro",
            "Contenido exclusivo",
            "Entrenamiento individual"
          ]
        };
      default:
        return {
          choosePlan: "Choose Your Plan",
          affordableOptions: "Affordable options for everyone",
          basicPlan: "Basic Plan",
          free: "Free",
          basicPlanFeatures: [
            "Access to basic workout plans",
            "Progress tracking"
          ],
          tryNow: "Try Now",
          proPlan: "Pro Plan",
          proPlanPrice: "$19.99/month",
          proPlanFeatures: [
            "Personalized coaching",
            "Advanced tracking",
            "Nutrition guides"
          ],
          buyNow: "Buy Now",
          premiumPlan: "Premium Plan",
          premiumPlanPrice: "$29.99/month",
          premiumPlanFeatures: [
            "All Pro Plan features",
            "Exclusive content",
            "One-on-one coaching"
          ]
        };
    }
  };

  const translations = getTranslations();

  return (
    <div className={styles.pricing}>
      <h2>{translations.choosePlan}</h2>
      <h3>{translations.affordableOptions}</h3>
      <div className={styles.pricingTiers}>
        <div
          className={`${styles.pricingTier} ${activePlan === "Basic" ? styles.active : ""}`}
          onMouseEnter={() => handleMouseEnter("Basic")}
        >
          <FaMedal />
          <h4>{translations.basicPlan}</h4>
          <p>{translations.free}</p>
          <ul>
            {translations.basicPlanFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button className="notSelectedButton-small">{translations.tryNow}</button>
        </div>
        <div
          className={`${styles.pricingTier} ${activePlan === "Pro" ? styles.active : ""}`}
          onMouseEnter={() => handleMouseEnter("Pro")}
        >
          <FaTrophy />
          <h4>{translations.proPlan}</h4>
          <p>{translations.proPlanPrice}</p>
          <ul>
            {translations.proPlanFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button className="notSelectedButton-small">{translations.buyNow}</button>
        </div>
        <div
          className={`${styles.pricingTier} ${activePlan === "Premium" ? styles.active : ""}`}
          onMouseEnter={() => handleMouseEnter("Premium")}
        >
          <FaCrown />
          <h4>{translations.premiumPlan}</h4>
          <p>{translations.premiumPlanPrice}</p>
          <ul>
            {translations.premiumPlanFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button className="notSelectedButton-small">{translations.buyNow}</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;