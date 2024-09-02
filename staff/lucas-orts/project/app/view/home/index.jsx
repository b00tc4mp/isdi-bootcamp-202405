import { Routes, Route } from 'react-router-dom'

import Hello from './Hello'

import ProductList from './ProductsList'
import AddProduct from './AddProduct'
import Search from './Search'
import Cart from './Cart'
import SearchResults from './Searchresults'
import Profile from "./Profile"

export default function Home({ }) {

    return <>
        <main className='flex flex-col items-center gap-4 mt-16 mb-12 dark:bg-black'>
            <Routes>
                <Route path='/' element={<Search />} />
                <Route path='/hello/:to' element={<Hello />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/product' element={<AddProduct />} />
                <Route path='/products' element={<ProductList />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/search' element={<SearchResults />} />
            </Routes>
        </main>

    </>
}
