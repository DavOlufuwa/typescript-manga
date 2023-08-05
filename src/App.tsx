import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'
import { AllComicsProvider } from './contexts/AllComicsContext'
import AllComics from './routes/AllComics'
import ComicDetails from './routes/ComicDetails'
import Layout from './routes/Layout'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="allcomics" element={<AllComics />} />
      <Route path="comics/:slug" element={<ComicDetails />} />
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
