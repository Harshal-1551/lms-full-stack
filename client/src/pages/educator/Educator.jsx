import { Outlet } from 'react-router-dom'
import SideBar from '../../components/educator/SideBar'
import Footer from '../../components/educator/Footer'
import Navbar from '../../components/common/Navbar'


const Educator = () => {
    return (
        <div className="text-default min-h-screen bg-white">
            <Navbar />
            <div className='flex'>
                <SideBar />
                <div className='flex-1'>
                    {<Outlet />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Educator