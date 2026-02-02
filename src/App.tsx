import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import WeeklyPlanPage from './pages/WeeklyPlanPage'
import RecipeBrowserPage from './pages/RecipeBrowserPage'
import NutritionCalculatorPage from './pages/NutritionCalculatorPage'
import RecipeDetailPage from './pages/RecipeDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="weekly" element={<WeeklyPlanPage />} />
          <Route path="browse" element={<RecipeBrowserPage />} />
          <Route path="calculator" element={<NutritionCalculatorPage />} />
          <Route path="recipe/:id" element={<RecipeDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
