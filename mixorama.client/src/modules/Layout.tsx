import { FC } from 'react';
import Navbar from './Navbar';
import TitleBar from './TitleBar';

interface ChildProps {
    children: React.ReactNode;
     }


const Layout: FC<ChildProps> = ({children}) =>{
    return(
        <>
        <div className='min-h-screen w-screen flex flex-col'>
            <TitleBar />
            <div className='flex-1 p-4 pb-32'>
                <main>{children}</main>
            </div>
            <Navbar />
        </div>
        </>
    )
}

export default Layout;