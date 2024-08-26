import { HomeDock } from "../components/Dock";
import Footer from "../components/Footer"
import Header from "../components/Header"

interface Props{
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className=" flex-1">
                {children}
            </div>
            <HomeDock/>
            <Footer/>

        </div>
    )
}

export default Layout