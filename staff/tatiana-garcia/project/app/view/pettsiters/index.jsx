import { useNavigate } from 'react-router-dom'

import Header from '../home/Header'
import Container from '../library/Container'
import Footer from '../home/Footer'

export default function Petsitters() {

    return <>
        <Header />
        <main className='bg-teal-100 h-screen flex flex-col items-center justify-start gap-4 text-[1.1rem]'>
            <Container className='mt-20'>
                <select name='city' id='city-input'>
                    <option value=''>Seleccione una ciudad</option>
                    <option value='madrid'>Madrid</option>
                    <option value='barcelona'>Barcelona</option>
                    <option value='valencia'>Valencia</option>
                    <option value='sevilla'>Sevilla</option>
                    <option value='zaragoza'>Zaragoza</option>
                    <option value='malaga'>Málaga</option>
                    <option value='murcia'>Murcia</option>
                    <option value='palma'>Palma</option>
                    <option value='las_palmas'>Las Palmas de Gran Canaria</option>
                    <option value='bilbao'>Bilbao</option>
                    <option value='alicante'>Alicante</option>
                    <option value='cordoba'>Córdoba</option>
                    <option value='valladolid'>Valladolid</option>
                    <option value='vigo'>Vigo</option>
                    <option value='gijon'>Gijón</option>
                    <option value='l_hospitalet'>L'Hospitalet de Llobregat</option>
                    <option value='vitoria'>Vitoria-Gasteiz</option>
                    <option value='la_coruna'>La Coruña</option>
                    <option value='granada'>Granada</option>
                    <option value='elche'>Elche</option>
                    <option value='oviedo'>Oviedo</option>
                    <option value='badalona'>Badalona</option>
                    <option value='sabadell'>Sabadell</option>
                    <option value='cartagena'>Cartagena</option>
                    <option value='terrassa'>Terrassa</option>
                    <option value='jerez'>Jerez de la Frontera</option>
                    <option value='santander'>Santander</option>
                    <option value='almeria'>Almería</option>
                    <option value='burgos'>Burgos</option>
                    <option value='albacete'>Albacete</option>
                    <option value='san_sebastian'>San Sebastián</option>
                    <option value='salamanca'>Salamanca</option>
                    <option value='logrono'>Logroño</option>
                    <option value='lleida'>Lleida</option>
                    <option value='marbella'>Marbella</option>
                    <option value='cadiz'>Cádiz</option>
                    <option value='huelva'>Huelva</option>
                    <option value='tarragona'>Tarragona</option>
                    <option value='leon'>León</option>
                    <option value='jaen'>Jaén</option>
                    <option value='ourense'>Ourense</option>
                    <option value='algeciras'>Algeciras</option>
                    <option value='gerona'>Gerona</option>
                    <option value='lugo'>Lugo</option>
                </select>
            </Container>


        </main>

        <Footer defaultTab={'petsitters'} />


    </>
}