import React, { useEffect, useState } from "react";
import styles from "./Calculator.module.css";
import NutritionalInfo from "../NutritionalInfo/NutritionalInfo";

const Calculator = ({ t }) => {
  const [alimento, setAlimento] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unidade, setUnidade] = useState("grams");
  const [calorias, setCalorias] = useState("");
  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false);
  const [nutritionalData, setNutritionalData] = useState({});
  const NUTRITIONIX_API_KEY = process.env.REACT_APP_NUTRITIONIX_API_KEY;
  const NUTRITIONIX_APP_ID = process.env.REACT_APP_NUTRITIONIX_APP_ID;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "alimento") setAlimento(value);
    else if (name === "quantity") setQuantity(value);
  };

  const handleUnidadeChange = (event) => {
    setUnidade(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) {
      setCalorias("Valor indefinido");
      return;
    }
    try {
      const response = await fetch(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": NUTRITIONIX_APP_ID,
            "x-app-key": NUTRITIONIX_API_KEY,
          },
          body: JSON.stringify({
            query: `${quantity} ${unidade} ${alimento}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setCalorias(data.foods[0].nf_calories);
      setNutritionalData(data.foods[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShowNutritionalInfo = () => {
    setShowNutritionalInfo(true);
  };

  const handleCloseNutritionalInfo = () => {
    setShowNutritionalInfo(false);
  };

  useEffect(() => {
    if (alimento === "") {
      setQuantity("");
      setCalorias("");
    }
  }, [alimento]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.labels}>
            <div className={styles.input}>
              <label className={styles.label} htmlFor="alimento">
                {t("ingredient")}:
              </label>
              <input
                type="text"
                id="alimento"
                name="alimento"
                value={alimento}
                onChange={handleChange}
                className={styles.ingredientInput}
              />
            </div>
            <div className={styles.quantityContainer}>
              <div className={styles.input}>
                <label className={styles.label} htmlFor="quantity">
                  {t("quantity")}:
                </label>
                <input
                  className={styles.quantityInput}
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                />
              </div>
              <select
                className={styles.quantityTypeInput}
                value={unidade}
                onChange={handleUnidadeChange}
              >
                <option value="grams">grams</option>
                <option value="unities">portions</option>
                <option value="ml">mililiters</option>
                <option value="ounces">ounces</option>
              </select>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className="inactiveButton" type="submit">
              <p> {t("calculate")} </p>
            </button>
          </div>
          <div className={styles.labels}>
            <div className={styles.input}>
              <label className={styles.label} htmlFor="calorias">
                {t("calories")}:
              </label>
              <input
                className={styles.caloriesInput}
                type="text"
                id="calorias"
                value={calorias}
                readOnly
              />
            </div>
          </div>
        </form>
        <div className={styles.buttonContainer}>
          <button className="inactiveButton">
            <p> {t("addToDailyAndMacros")}</p>
          </button>
        </div>
      </div>

      {calorias !== "" &&
        calorias !== "Valor indefinido" &&
        parseFloat(quantity) > 0 && (
          <h4 onClick={handleShowNutritionalInfo}>
            <u>{t("nutritionalInfo")}</u>
          </h4>
        )}
      {showNutritionalInfo && (
        <NutritionalInfo
          data={nutritionalData}
          onClose={handleCloseNutritionalInfo}
          unidade={unidade}
          quantidade={quantity}
        />
      )}
    </div>
  );
};

export default Calculator;
