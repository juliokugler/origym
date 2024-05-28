import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import styles from "./SavedRecipes.module.css";
import RecipeCategories from "../RecipeCategories/RecipeCategories";

const SavedRecipes = ({ selectedCategory }) => {
  const [recipes, setRecipes] = useState([]); // State for storing recipes

  useEffect(() => {
    fetchRecipes(); // Fetch recipes when component mounts
  }, [selectedCategory]);

  const fetchRecipes = () => {
    // Dummy data for recipes with descriptions
    const dummyRecipes = {
      Standard: [
        {
          id: "r7",
          title: "Vegetable Stir Fry",
          image:
            "https://playswellwithbutter.com/wp-content/uploads/2022/02/Beef-and-Vegetable-Stir-Fry-16.jpg",
          description:
            "A dish consisting of various vegetables, such as bell peppers, broccoli, carrots, and snap peas, quickly cooked in a hot wok or skillet with oil and seasonings, often including soy sauce and garlic.",
          ingredients: [
            "2 tablespoons vegetable oil",
            "2 cloves garlic, minced",
            "1 bell pepper, sliced",
            "1 cup broccoli florets",
            "1 carrot, thinly sliced",
            "1 cup snap peas",
            "1/4 cup soy sauce",
            "2 tablespoons oyster sauce (optional)",
            "2 tablespoons water",
            "1 teaspoon cornstarch",
            "Cooked rice for serving",
          ],
          totalCalories: "Approximately 250 calories per serving",
          preparation:
            "1. In a small bowl, mix soy sauce, oyster sauce (if using), water, and cornstarch until well combined. Set aside.\n2. Heat vegetable oil in a wok or large skillet over high heat. Add minced garlic and cook for 30 seconds.\n3. Add bell pepper, broccoli, carrot, and snap peas to the wok. Stir-fry for 3-4 minutes or until vegetables are tender-crisp.\n4. Pour the sauce mixture over the vegetables. Stir well and cook for another 1-2 minutes until the sauce thickens.\n5. Serve the stir-fry hot over cooked rice.",
        },
        {
          id: "r3",
          title: "Chicken Caesar Salad",
          image:
            "https://hips.hearstapps.com/hmg-prod/images/chicken-caesar-salad7-1654809005.jpg?crop=1xw:0.8435812837432514xh;center,top&resize=1200:*",
          description:
            "A classic salad made with crisp romaine lettuce, grilled chicken breast, parmesan cheese, croutons, and creamy Caesar dressing.",
          ingredients: [
            "2 boneless, skinless chicken breasts",
            "1 head of romaine lettuce, chopped",
            "1/2 cup grated parmesan cheese",
            "1 cup croutons",
            "1/2 cup Caesar dressing",
            "Salt and pepper to taste",
          ],
          totalCalories: "Approximately 350 calories per serving",
          preparation:
            "1. Season chicken breasts with salt and pepper. Grill or cook in a skillet until fully cooked, about 6-7 minutes per side. Let cool slightly, then slice into strips.\n2. In a large bowl, combine chopped romaine lettuce, parmesan cheese, and croutons. Add sliced chicken.\n3. Pour Caesar dressing over the salad and toss until everything is evenly coated. Serve immediately.",
        },
        {
          id: "r10",
          title: "Strawberry Shortcake",
          image:
            "https://driscolls.imgix.net/-/media/assets/recipes/classic-strawberry-shortcake-recipe.ashx",
          description:
            "A classic dessert made with layers of fluffy sponge cake, sweetened whipped cream, and fresh strawberries, perfect for summertime enjoyment.",
          ingredients: [
            "1 1/2 cups all-purpose flour",
            "1/2 cup sugar",
            "2 teaspoons baking powder",
            "1/4 teaspoon salt",
            "1/3 cup cold unsalted butter, cubed",
            "1/2 cup milk",
            "1 teaspoon vanilla extract",
            "1 cup heavy cream",
            "2 tablespoons powdered sugar",
            "1 teaspoon vanilla extract",
            "2 cups sliced fresh strawberries",
          ],
          totalCalories: "Approximately 400 calories per serving",
          preparation:
            "1. Preheat the oven to 425°F (220°C). Grease and flour a 9-inch round cake pan.\n2. In a large bowl, whisk together flour, sugar, baking powder, and salt. Cut in the cold butter until the mixture resembles coarse crumbs.\n3. Stir in milk and vanilla extract until a soft dough forms. Press the dough into the prepared cake pan.\n4. Bake for 15-20 minutes or until golden brown. Let cool completely.\n5. In a separate bowl, whip the heavy cream with powdered sugar and vanilla extract until stiff peaks form.\n6. To assemble the shortcake, slice the cooled cake horizontally. Place the bottom half on a serving plate, top with whipped cream and sliced strawberries. Place the top half of the cake over the strawberries. Serve immediately.",
        },
        {
          id: "r13",
          title: "Avocado Toast with Cottage Cheese",
          image:
            "https://loveonetoday.com/wp-content/uploads/2017/12/Love-One-Today-Avocado-Recipes-Featured-breakfast-toast-with-cottage-cheese-and-avocado.jpg",
          description:
            "A satisfying snack featuring whole grain toast topped with mashed avocado, creamy cottage cheese, and a sprinkle of red pepper flakes, rich in healthy fats and protein.",
          ingredients: [
            "1 ripe avocado",
            "2 slices whole grain bread, toasted",
            "1/2 cup cottage cheese",
            "Red pepper flakes, to taste",
          ],
          totalCalories: "Approximately 250 calories per serving",
          preparation:
            "1. Mash the ripe avocado in a bowl using a fork.\n2. Spread mashed avocado evenly onto toasted whole grain bread slices.\n3. Top each slice with a generous dollop of cottage cheese.\n4. Sprinkle red pepper flakes over the cottage cheese.\n5. Serve immediately.",
        },
      ],
      Breakfast: [
        {
          id: "r5",
          title: "Avocado Toast",
          image:
            "https://www.thespruceeats.com/thmb/dfa8Uq14SlF33FCAsPbDZVHp9bE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/avocado-toast-4174244-hero-03-d9d005dc633f44889ba5385fe4ebe633.jpg",
          description:
            "A simple yet satisfying breakfast featuring mashed avocado spread on toasted bread, typically seasoned with salt, pepper, and optional toppings like sliced tomatoes, eggs, or bacon.",
          ingredients: [
            "1 ripe avocado",
            "2 slices bread, toasted",
            "Salt and pepper to taste",
            "Optional toppings: sliced tomatoes, fried or poached eggs, cooked bacon",
          ],
          totalCalories: "Approximately 200 calories per serving",
          preparation:
            "1. Cut the ripe avocado in half and remove the pit. Scoop out the flesh into a bowl.\n2. Mash the avocado with a fork until smooth or slightly chunky, depending on your preference.\n3. Season the mashed avocado with salt and pepper to taste.\n4. Spread the mashed avocado evenly onto the toasted bread slices.\n5. Top with optional toppings such as sliced tomatoes, fried or poached eggs, or cooked bacon, if desired.\n6. Serve immediately and enjoy!",
        },
        {
          id: "r1",
          title: "Omelette",
          image:
            "https://www.simplyrecipes.com/thmb/LLhiA8KZ7JZ5ZI0g-1bF1eg-gGM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2018__10__HT-Make-an-Omelet-LEAD-HORIZONTAL-17cd2e469c4a4ccbbd1273a7cae6425c.jpg",
          description:
            "A classic breakfast dish made by whisking eggs with various fillings like cheese, vegetables, and meats, then cooked until set into a fluffy and flavorful meal.",
          ingredients: [
            "2-3 large eggs",
            "1/4 cup milk or water",
            "Salt and pepper to taste",
            "Fillings of your choice (e.g., shredded cheese, diced vegetables, cooked meats)",
            "1 tablespoon butter or oil for cooking",
          ],
          totalCalories: "Approximately 300 calories per serving",
          preparation:
            "1. In a bowl, whisk together eggs, milk or water, salt, and pepper until well combined.\n2. Heat butter or oil in a non-stick skillet over medium heat until hot.\n3. Pour the egg mixture into the skillet, swirling to evenly coat the bottom.\n4. Cook for 1-2 minutes until the edges start to set.\n5. Sprinkle fillings of your choice over one half of the omelette.\n6. Using a spatula, fold the other half of the omelette over the fillings to form a half-moon shape.\n7. Cook for another 1-2 minutes until the omelette is cooked through and the fillings are heated.\n8. Slide the omelette onto a plate and serve hot.",
        },
        {
          id: "r2",
          title: "Pancakes",
          image:
            "https://www.allrecipes.com/thmb/WqWggh6NwG-r8PoeA3OfW908FUY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_001-1fa26bcdedc345f182537d95b6cf92d8.jpg",
          description:
            "Delicious breakfast cakes made from a batter of flour, eggs, milk, and leavening agents, cooked on a griddle until golden brown and fluffy, often served with syrup, butter, and fresh fruit.",
          ingredients: [
            "1 1/2 cups all-purpose flour",
            "3 1/2 teaspoons baking powder",
            "1 teaspoon salt",
            "1 tablespoon white sugar",
            "1 1/4 cups milk",
            "1 egg",
            "3 tablespoons butter, melted",
          ],
          totalCalories: "Approximately 250 calories per serving",
          preparation:
            "1. In a large bowl, sift together flour, baking powder, salt, and sugar.\n2. In a separate bowl, beat together milk, egg, and melted butter.\n3. Pour the wet ingredients into the dry ingredients and stir until just combined.\n4. Heat a lightly oiled griddle or frying pan over medium-high heat.\n5. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake.\n6. Cook until bubbles form on the surface, then flip and cook until golden brown on the other side.\n7. Serve hot with syrup, butter, and fresh fruit.",
        },
      ],
      Lunch: [
        {
          id: "r3",
          title: "Chicken Caesar Salad",
          image:
            "https://hips.hearstapps.com/hmg-prod/images/chicken-caesar-salad7-1654809005.jpg?crop=1xw:0.8435812837432514xh;center,top&resize=1200:*",
          description:
            "A classic salad made with crisp romaine lettuce, grilled chicken breast, parmesan cheese, croutons, and creamy Caesar dressing.",
          ingredients: [
            "2 boneless, skinless chicken breasts",
            "1 head of romaine lettuce, chopped",
            "1/2 cup grated parmesan cheese",
            "1 cup croutons",
            "1/2 cup Caesar dressing",
            "Salt and pepper to taste",
          ],
          totalCalories: "Approximately 350 calories per serving",
          preparation:
            "1. Season chicken breasts with salt and pepper. Grill or cook in a skillet until fully cooked, about 6-7 minutes per side. Let cool slightly, then slice into strips.\n2. In a large bowl, combine chopped romaine lettuce, parmesan cheese, and croutons. Add sliced chicken.\n3. Pour Caesar dressing over the salad and toss until everything is evenly coated. Serve immediately.",
        },
        {
          id: "r4",
          title: "Caprese Sandwich",
          image:
            "https://www.thekitcheneer.com/wp-content/uploads/2023/04/Toasted-Caprese-Sandwich-3.jpg",
          description:
            "A delicious sandwich filled with fresh mozzarella cheese, ripe tomatoes, basil leaves, and drizzled with balsamic glaze on crusty Italian bread.",
          ingredients: [
            "4 slices crusty Italian bread",
            "8 slices fresh mozzarella cheese",
            "2 ripe tomatoes, sliced",
            "8 fresh basil leaves",
            "Balsamic glaze for drizzling",
          ],
          totalCalories: "Approximately 350 calories per serving",
          preparation:
            "1. Preheat a panini press or a skillet over medium heat.\n2. Assemble the sandwiches by layering slices of mozzarella cheese, tomato, and basil leaves between slices of Italian bread.\n3. Drizzle balsamic glaze over the filling.\n4. Grill the sandwiches in the panini press or skillet until the bread is golden brown and the cheese is melted.\n5. Serve hot.",
        },
        {
          id: "r5",
          title: "Vegetable Pasta Salad",
          image:
            "https://midwestfoodieblog.com/wp-content/uploads/2022/04/FINAL-Italian-pasta-salad-1-1200x1800.jpg",
          description:
            "A refreshing pasta salad loaded with colorful vegetables like cherry tomatoes, cucumbers, bell peppers, and tossed in a zesty Italian dressing.",
          ingredients: [
            "8 oz pasta (such as fusilli or rotini)",
            "1 cup cherry tomatoes, halved",
            "1 cucumber, diced",
            "1 bell pepper, diced",
            "1/4 cup red onion, thinly sliced",
            "1/4 cup black olives, sliced",
            "1/4 cup fresh parsley, chopped",
            "1/2 cup Italian dressing",
            "Salt and pepper to taste",
          ],
          totalCalories: "Approximately 300 calories per serving",
          preparation:
            "1. Cook pasta according to package instructions until al dente. Drain and rinse under cold water.\n2. In a large bowl, combine cooked pasta, cherry tomatoes, cucumber, bell pepper, red onion, black olives, and parsley.\n3. Pour Italian dressing over the salad and toss until everything is evenly coated.\n4. Season with salt and pepper to taste.\n5. Cover and refrigerate for at least 1 hour before serving to allow flavors to meld.\n6. Serve chilled.",
        },
      ],
      Dinner: [
        {
          id: "r6",
          title: "Butter Chicken",
          image:
            "https://littlespicejar.com/wp-content/uploads/2016/02/Finger-Lickin-Butter-Chicken-14-540x720.jpg",
          description:
            "A popular Indian dish made with tender chicken cooked in a rich and creamy tomato-based sauce, typically flavored with butter, cream, and a blend of aromatic spices.",
          ingredients: [
            "1 lb boneless, skinless chicken thighs or breasts, cut into bite-sized pieces",
            "1/4 cup plain yogurt",
            "2 tablespoons lemon juice",
            "1 teaspoon ground turmeric",
            "1 teaspoon ground cumin",
            "1 teaspoon ground coriander",
            "1/2 teaspoon chili powder (adjust to taste)",
            "1/4 cup butter",
            "1 onion, finely chopped",
            "3 cloves garlic, minced",
            "1 tablespoon grated ginger",
            "1 can (14 oz) crushed tomatoes",
            "1/2 cup heavy cream",
            "Salt and pepper to taste",
            "Fresh cilantro for garnish",
          ],
          totalCalories: "Approximately 400 calories per serving",
          preparation:
            "1. In a bowl, combine yogurt, lemon juice, turmeric, cumin, coriander, and chili powder. Add chicken pieces and marinate for at least 30 minutes, or up to 4 hours in the refrigerator.\n2. In a large skillet, melt butter over medium heat. Add chopped onion and cook until softened, about 5 minutes.\n3. Add minced garlic and grated ginger to the skillet. Cook for another 2 minutes.\n4. Add marinated chicken along with any remaining marinade to the skillet. Cook until chicken is browned on all sides.\n5. Stir in crushed tomatoes and simmer for 15-20 minutes, stirring occasionally, until chicken is cooked through and the sauce has thickened.\n6. Stir in heavy cream and simmer for an additional 5 minutes.\n7. Season with salt and pepper to taste. Garnish with fresh cilantro before serving Serve hot with rice or naan.",
        },
        {
          id: "r7",
          title: "Vegetable Stir Fry",
          image:
            "https://playswellwithbutter.com/wp-content/uploads/2022/02/Beef-and-Vegetable-Stir-Fry-16.jpg",
          description:
            "A dish consisting of various vegetables, such as bell peppers, broccoli, carrots, and snap peas, quickly cooked in a hot wok or skillet with oil and seasonings, often including soy sauce and garlic.",
          ingredients: [
            "2 tablespoons vegetable oil",
            "2 cloves garlic, minced",
            "1 bell pepper, sliced",
            "1 cup broccoli florets",
            "1 carrot, thinly sliced",
            "1 cup snap peas",
            "1/4 cup soy sauce",
            "2 tablespoons oyster sauce (optional)",
            "2 tablespoons water",
            "1 teaspoon cornstarch",
            "Cooked rice for serving",
          ],
          totalCalories: "Approximately 250 calories per serving",
          preparation:
            "1. In a small bowl, mix soy sauce, oyster sauce (if using), water, and cornstarch until well combined. Set aside.\n2. Heat vegetable oil in a wok or large skillet over high heat. Add minced garlic and cook for 30 seconds.\n3. Add bell pepper, broccoli, carrot, and snap peas to the wok. Stir-fry for 3-4 minutes or until vegetables are tender-crisp.\n4. Pour the sauce mixture over the vegetables. Stir well and cook for another 1-2 minutes until the sauce thickens.\n5. Serve the stir-fry hot over cooked rice.",
        },
        {
          id: "r8",
          title: "Salmon Salad",
          image:
            "https://www.recipetineats.com/wp-content/uploads/2019/07/Salmon-Salad_1-SQ.jpg",
          description:
            "A refreshing salad featuring flaky salmon fillets, usually grilled or baked, served over a bed of mixed greens and accompanied by a variety of toppings like cherry tomatoes, cucumber slices, avocado, and a zesty dressing.",
          ingredients: [
            "2 salmon fillets",
            "Salt and pepper to taste",
            "4 cups mixed greens",
            "1 cup cherry tomatoes, halved",
            "1 cucumber, sliced",
            "1 avocado, sliced",
            "1/4 cup red onion, thinly sliced",
            "2 tablespoons chopped fresh dill",
            "2 tablespoons olive oil",
            "1 tablespoon lemon juice",
            "1 teaspoon Dijon mustard",
            "1 teaspoon honey",
            "Salt and pepper to taste",
          ],
          totalCalories: "Approximately 350 calories per serving",
          preparation:
            "1. Preheat the oven to 400°F (200°C). Season salmon fillets with salt and pepper. Place on a baking sheet lined with parchment paper.\n2. Bake salmon for 12-15 minutes, or until cooked through and flaky.\n3. In a large bowl, combine mixed greens, cherry tomatoes, cucumber, avocado, red onion, and chopped fresh dill.\n4. In a small bowl, whisk together olive oil, lemon juice, Dijon mustard, honey, salt, and pepper to make the dressing.\n5. Flake the cooked salmon and add it to the salad. Drizzle with the prepared dressing and toss gently to combine.\n6. Serve immediately.",
        },
      ],
      Dessert: [
        {
          id: "r9",
          title: "Chocolate Lava Cake",
          image:
            "https://static01.nyt.com/images/2023/02/14/dining/two_person_lava_cake_1260/two_person_lava_cake_1260-superJumbo.jpg",
          description:
            "An indulgent dessert featuring a rich and gooey chocolate cake with a molten chocolate center, served warm with a scoop of vanilla ice cream.",
          ingredients: [
            "1/2 cup (1 stick) unsalted butter, plus more for greasing ramekins",
            "4 oz semisweet or bittersweet chocolate, chopped",
            "2 large eggs",
            "2 large egg yolks",
            "1/4 cup granulated sugar",
            "Pinch of salt",
            "2 tablespoons all-purpose flour",
            "Vanilla ice cream, for serving",
          ],
          totalCalories: "Approximately 400 calories per serving",
          preparation:
            "1. Preheat the oven to 425°F (220°C). Grease four 6-ounce ramekins with butter.\n2. In a microwave-safe bowl, melt the butter and chopped chocolate together in 30-second intervals, stirring after each, until smooth. Let cool slightly.\n3. In a separate bowl, whisk together eggs, egg yolks, sugar, and salt until pale and thickened.\n4. Gradually whisk the melted chocolate mixture into the egg mixture until well combined.\n5. Sift flour over the mixture and fold gently until just combined.\n6. Divide the batter evenly among the prepared ramekins. Place ramekins on a baking sheet and bake for 12-14 minutes, or until the edges are set but the center is still soft.\n7. Remove from the oven and let cool for 1 minute. Run a knife around the edge of each cake and invert onto serving plates.\n8. Serve immediately with a scoop of vanilla ice cream on top.",
        },
        {
          id: "r10",
          title: "Strawberry Shortcake",
          image:
            "https://driscolls.imgix.net/-/media/assets/recipes/classic-strawberry-shortcake-recipe.ashx",
          description:
            "A classic dessert made with layers of fluffy sponge cake, sweetened whipped cream, and fresh strawberries, perfect for summertime enjoyment.",
          ingredients: [
            "For the cake:",
            "- 1 1/2 cups all-purpose flour",
            "- 1/2 cup granulated sugar",
            "- 2 teaspoons baking powder",
            "- 1/4 teaspoon salt",
            "- 1/2 cup unsalted butter, cold and cut into small pieces",
            "- 1/2 cup milk",
            "- 1 large egg",
            "- 1 teaspoon vanilla extract",
            "For the topping:",
            "- 2 cups sliced fresh strawberries",
            "- 1/4 cup granulated sugar",
            "For the whipped cream:",
            "- 1 cup heavy cream",
            "- 2 tablespoons powdered sugar",
            "- 1 teaspoon vanilla extract",
          ],
          totalCalories: "Approximately 400 calories per serving",
          preparation:
            "1. Preheat the oven to 375°F (190°C). Grease and flour an 8-inch round cake pan.\n2. In a large bowl, combine flour, sugar, baking powder, and salt. Cut in the cold butter until the mixture resembles coarse crumbs.\n3. In a separate bowl, whisk together milk, egg, and vanilla extract. Add to the flour mixture and stir until just combined.\n4. Pour the batter into the prepared cake pan and spread it evenly. Bake for 20-25 minutes or until a toothpick inserted into the center comes out clean.\n5. Let the cake cool in the pan for 10 minutes, then transfer to a wire rack to cool completely.\n6. Meanwhile, toss sliced strawberries with granulated sugar and let sit for 15-20 minutes until juicy.\n7. In a chilled bowl, whip heavy cream with powdered sugar and vanilla extract until stiff peaks form.\n8. To assemble the shortcake, slice the cooled cake horizontally. Place the bottom half on a serving plate, top with whipped cream and sliced strawberries. Place the top half of the cake over the strawberries. Serve immediately.",
        },
        {
          id: "r11",
          title: "Tiramisu",
          image:
            "https://cloudfront-us-east-1.images.arcpublishing.com/estadao/Q3SE72ZUZRGKHOJHHW33TBLP4A.jpg",
          description:
            "A decadent Italian dessert made with layers of espresso-soaked ladyfingers, creamy mascarpone cheese filling, and dusted with cocoa powder.",
          ingredients: [
            "- 6 egg yolks",
            "- 3/4 cup granulated sugar",
            "- 1 cup mascarpone cheese",
            "- 1 1/2 cups heavy cream",
            "- 2 cups strong brewed coffee, cooled",
            "- 1/4 cup coffee liqueur (optional)",
            "- 2 packages (about 7 oz each) ladyfingers",
            "- Cocoa powder, for dusting",
          ],
          totalCalories: "Approximately 350 calories per serving",
          preparation:
            "1. In a heatproof bowl, whisk together egg yolks and sugar until pale and creamy.\n2. Place the bowl over a pot of simmering water (double boiler) and continue whisking until the mixture thickens and reaches 160°F (71°C) on a candy thermometer.\n3. Remove from heat and let cool slightly. Whisk in mascarpone cheese until smooth.\n4. In a separate bowl, whip heavy cream until stiff peaks form. Gently fold whipped cream into the mascarpone mixture until well combined.\n5. In a shallow dish, combine cooled coffee and coffee liqueur (if using). Dip ladyfingers into the coffee mixture briefly, making sure not to soak them too much.\n6. Arrange a layer of dipped ladyfingers in the bottom of a serving dish.\n7. Spread half of the mascarpone mixture over the ladyfingers. Repeat with another layer of dipped ladyfingers and remaining mascarpone mixture.\n8. Cover and refrigerate tiramisu for at least 4 hours, or overnight, to allow flavors to meld.\n9. Before serving, dust the top of tiramisu with cocoa powder. Enjoy chilled.",
        },
      ],
      Snacks: [
        {
          id: "r12",
          title: "Greek Yogurt Parfait",
          image:
            "https://www.macrostax.com/wp-content/uploads/2021/12/Blog_Featured_Image_-_Easy_Greek_Yogurt_Parfait-1.png",
          description:
            "A healthy snack made with layers of Greek yogurt, fresh berries, granola, and a drizzle of honey, packed with protein and fiber.",
          ingredients: [
            "1 cup Greek yogurt",
            "1/2 cup mixed berries (such as strawberries, blueberries, raspberries)",
            "1/4 cup granola",
            "1 tablespoon honey",
          ],
          totalCalories: "Approximately 200 calories per serving",
          preparation:
            "1. In a glass or a bowl, layer Greek yogurt, mixed berries, and granola.\n2. Drizzle honey over the top.\n3. Repeat layering if desired.\n4. Serve immediately and enjoy!",
        },
        {
          id: "r13",
          title: "Avocado Toast with Cottage Cheese",
          image:
            "https://loveonetoday.com/wp-content/uploads/2017/12/Love-One-Today-Avocado-Recipes-Featured-breakfast-toast-with-cottage-cheese-and-avocado.jpg",
          description:
            "A satisfying snack featuring whole grain toast topped with mashed avocado, creamy cottage cheese, and a sprinkle of red pepper flakes, rich in healthy fats and protein.",
          ingredients: [
            "1 ripe avocado",
            "2 slices whole grain bread, toasted",
            "1/2 cup cottage cheese",
            "Red pepper flakes, to taste",
          ],
          totalCalories: "Approximately 250 calories per serving",
          preparation:
            "1. Mash the ripe avocado in a bowl using a fork.\n2. Spread mashed avocado evenly onto toasted whole grain bread slices.\n3. Top each slice with a generous dollop of cottage cheese.\n4. Sprinkle red pepper flakes over the cottage cheese.\n5. Serve immediately.",
        },
        {
          id: "r14",
          title: "Trail Mix Energy Bites",
          image:
            "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/230779.jpg",
          description:
            "Portable and nutritious snack bites made with a blend of nuts, seeds, dried fruits, and a touch of honey, perfect for on-the-go energy.",
          ingredients: [
            "1 cup rolled oats",
            "1/2 cup nut butter (such as peanut butter or almond butter)",
            "1/4 cup honey",
            "1/4 cup chopped nuts (such as almonds, walnuts)",
            "1/4 cup dried fruits (such as raisins, cranberries)",
            "2 tablespoons chia seeds",
            "2 tablespoons mini chocolate chips (optional)",
          ],
          totalCalories: "Approximately 150 calories per serving",
          preparation:
            "1. In a large bowl, mix together rolled oats, nut butter, honey, chopped nuts, dried fruits, chia seeds, and mini chocolate chips (if using) until well combined.\n2. Roll the mixture into bite-sized balls using your hands.\n3. Place the energy bites on a baking sheet lined with parchment paper.\n4. Refrigerate for at least 30 minutes to firm up.\n5. Store the energy bites in an airtight container in the refrigerator for up to 1 week.\n6. Enjoy as a quick and nutritious snack anytime!",
        },
      ],
    };

    // Set recipes based on the selected category
    if (selectedCategory && dummyRecipes[selectedCategory]) {
      setRecipes(dummyRecipes[selectedCategory]);
    } else {
      // If no category is selected or category not found, set recipes to an empty array
      setRecipes([]);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.recipeGrid}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            image={recipe.image}
            description={recipe.description}
            ingredients={recipe.ingredients}
            preparation={recipe.preparation}
            totalCalories={recipe.totalCalories}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
