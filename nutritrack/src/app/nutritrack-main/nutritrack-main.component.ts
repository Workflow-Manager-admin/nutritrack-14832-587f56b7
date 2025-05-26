import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Basic ingredient type
interface Ingredient {
  name: string;
  calories: number;
  protein: number;
}

// Meal type
interface Meal {
  name: string;
  ingredients: Ingredient[];
  date: Date;
}

type TimeView = 'day' | 'week' | 'month';

/**
 * NutriTrackMainComponent
 * The main container for tracking meals, selecting ingredients, 
 * saving meals, tracking consumption, and switching views.
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'nutritrack-main',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nutritrack-main.component.html',
  styleUrls: ['./nutritrack-main.component.css']
})
export class NutriTrackMainComponent {
  // Master list of selectable ingredients (could come from API in real app)
  ingredientsMaster: Ingredient[] = [
    { name: 'Chicken Breast', calories: 165, protein: 31 },
    { name: 'Brown Rice', calories: 215, protein: 5 },
    { name: 'Egg', calories: 78, protein: 6 },
    { name: 'Broccoli', calories: 55, protein: 3.7 },
    { name: 'Salmon', calories: 208, protein: 20 },
    { name: 'Almonds', calories: 164, protein: 6 },
    { name: 'Quinoa', calories: 120, protein: 4 },
    { name: 'Banana', calories: 105, protein: 1.3 },
    { name: 'Greek Yogurt', calories: 100, protein: 17 },
    { name: 'Tofu', calories: 76, protein: 8 },
    { name: 'Spinach', calories: 23, protein: 2.9 },
    { name: 'Oats', calories: 150, protein: 5 },
    { name: 'Peanut Butter', calories: 190, protein: 7 },
    { name: 'Avocado', calories: 160, protein: 2 },
    { name: 'Sweet Potato', calories: 86, protein: 1.6 },
  ];

  // Searchable, filterable list
  ingredientSearchQuery = '';
  get filteredIngredients(): Ingredient[] {
    const q = this.ingredientSearchQuery.trim().toLowerCase();
    return q
      ? this.ingredientsMaster.filter(
          ing => ing.name.toLowerCase().includes(q)
        )
      : this.ingredientsMaster;
  }

  // Meal being created
  selectedIngredients: Ingredient[] = [];
  mealName: string = '';

  // All saved meals (persist in-memory)
  meals: Meal[] = [];

  // Tabs: day/week/month selection
  timeView: TimeView = 'day';
  get displayPeriodLabel(): string {
    const now = new Date();
    switch (this.timeView) {
      case 'day': return now.toLocaleDateString();
      case 'week': {
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        return start.toLocaleDateString() + ' - ' + end.toLocaleDateString();
      }
      case 'month':
        return now.toLocaleString('default', { month: 'long', year: 'numeric' });
      default:
        return '';
    }
  }

  // Formatted filtered meals for the period
  get mealsForPeriod(): Meal[] {
    const now = new Date();
    return this.meals.filter(meal => {
      const mealDate = new Date(meal.date);
      if (this.timeView === 'day') {
        return mealDate.toDateString() === now.toDateString();
      }
      if (this.timeView === 'week') {
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        const end = new Date(now);
        end.setDate(start.getDate() + 6);
        return mealDate >= start && mealDate <= end;
      }
      if (this.timeView === 'month') {
        return (
          mealDate.getFullYear() === now.getFullYear() &&
          mealDate.getMonth() === now.getMonth()
        );
      }
      return false;
    });
  }

  // Calorie/protein summary computations
  get totalCalories(): number {
    return this.mealsForPeriod
      .reduce((sum, meal) => sum + this.getMealCalories(meal), 0);
  }
  get totalProtein(): number {
    return this.mealsForPeriod
      .reduce((sum, meal) => sum + this.getMealProtein(meal), 0);
  }

  // Helper to compute meal cals/protein
  getMealCalories(meal: Meal): number {
    return meal.ingredients.reduce((sum, ing) => sum + ing.calories, 0);
  }
  getMealProtein(meal: Meal): number {
    return meal.ingredients.reduce((sum, ing) => sum + ing.protein, 0);
  }

  // Ingredient selection logic
  addIngredient(ing: Ingredient) {
    if (!this.selectedIngredients.includes(ing)) {
      this.selectedIngredients.push(ing);
    }
  }
  removeIngredient(ing: Ingredient) {
    this.selectedIngredients = this.selectedIngredients.filter(i => i !== ing);
  }
  clearSelection() {
    this.selectedIngredients = [];
    this.mealName = '';
  }

  // Meal Saving action
  saveMeal() {
    if (!this.selectedIngredients.length || !this.mealName.trim()) return;
    this.meals.unshift({
      name: this.mealName.trim(),
      ingredients: [...this.selectedIngredients],
      date: new Date()
    });
    this.clearSelection();
  }

  // Remove meal
  removeMeal(idx: number) {
    this.meals.splice(idx, 1);
  }

  // Switch dashboard period
  setTimeView(view: TimeView) {
    this.timeView = view;
  }
}
