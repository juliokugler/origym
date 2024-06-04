import React from 'react';
import { db } from "../../../firebase/config"
import { collection, doc, setDoc } from "firebase/firestore";

const UploadRecipes = () => 
{/* {  const uploadToFirebase = async () => {
    try {
      const mealTypes = Object.keys(recipes);

      for (const mealType of mealTypes) {
        const meals = recipes[mealType];
        const mealCollectionRef = collection(db, 'mealSuggestions', mealType, 'meals');

        for (const meal of meals) {
          const mealDocRef = doc(mealCollectionRef, meal.id);
          await setDoc(mealDocRef, meal);
        }
      }

      console.log('Recipes uploaded successfully');
    } catch (error) {
      console.error('Error uploading recipes: ', error);
    }
  };

  return (
    <div>
      <button onClick={uploadToFirebase}>Upload Recipes</button>
    </div>
  );
};

export default UploadRecipes;*/}