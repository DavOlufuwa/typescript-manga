import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'
import { AllComicsProvider } from './contexts/AllComicsContext'
import ComicInfo from './routes/ComicInfo'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="comic" element={<ComicInfo />} />
    </Route>
  )
)



function App() {
 
  return (
    <AllComicsProvider>
      <RouterProvider router={router}/>
    </AllComicsProvider>
  )
}

export default App
