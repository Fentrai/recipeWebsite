import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const apiKey = 'ad71e21529984c4385d5ce687ba61d8e'; // Replace with your Spoonacular API key
        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`);
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchRecipes();
    };

    return (
        <div className="App">
            <h1>Recipe Finder</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Enter ingredients (comma separated)"
                />
                <button type="submit">Find Recipes</button>
            </form>
            <div className="recipes">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe">
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} />
                        <a href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`} target="_blank" rel="noopener noreferrer">View Recipe</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;