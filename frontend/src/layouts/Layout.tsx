import Footer from "../components/Footer"
import Header from "../components/Header"

interface Props{
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className=" pb-10 flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout