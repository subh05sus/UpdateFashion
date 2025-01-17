import { Link } from "react-router-dom"

const Footer = () =>{
    return (
        <div className="bg-neutral-200 py-10">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-black font-bold tracking-tight">
                    <Link to='/'>              <img className="w-auto h-16 lg:h-24  mix-blend-color-burn" src="/logo.png" alt="Logo" />
                    </Link>
                </span>
                <span className="text-black font-bold tracking-tight flex gap-4">
                    <Link to={`/privacy-policy`} className="cursor-pointer">Privacy Policy</Link>
                    <Link to={`/terms-of-service`} className="cursor-pointer">Terms of Service</Link>
                </span>
            </div>
        </div>
    )
}

export default Footer