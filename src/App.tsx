import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import './App.css'
import Home from './routes/Home'
import { AllComicsProvider } from './contexts/AllComicsContext'
import AllComics from './routes/AllComics'
import ComicDetails from './routes/ComicDetails'
import Layout from './routes/Layout'
import { SavedAndReadComicsProvider } from './contexts/SavedAndReadComicsContext'
import ComicChapter from './routes/ComicChapter'
import SavedComics from './routes/SavedComics'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="savedcomics" element={<SavedComics />}/>
      <Route path="allcomics" element={<AllComics />} />
      <Route path="comics/:slug" element={<ComicDetails />} />
      <Route path="comics/:slug/chapter/:chapter" element={<ComicChapter/>}/>
    </Route>
  )
)


function App() {
  return (
    <AllComicsProvider>
      <SavedAndReadComicsProvider>
        <RouterProvider router={router}/>
      </SavedAndReadComicsProvider>
    </AllComicsProvider>
  )
}

export default App
