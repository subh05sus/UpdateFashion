/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getHomePhotos } from "../api-client";
import { FocusCards } from "./ui/focus-cards";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import HyperText from "./magicui/hyper-text";

function HomePhotos() {
    const [homePhotos, setHomePhotos] = useState<any[]>([]);

    useEffect(() => {
        const fetchHomePhotos = async () => {
            try {
                const data = await getHomePhotos();
                setHomePhotos(data);
            } catch (error) {
                console.error("Error fetching home photos:", error);
            }
        };

        fetchHomePhotos();
    }, []);
    return (
        <div className="pt-10">
            <div className="flex justify-center">

                <HyperText className="text-center poppins-bold  text-4xl mb-3 " text={"Gallery"} />
            </div>
            <BackgroundBeamsWithCollision>
                <FocusCards cards={homePhotos} />
            </BackgroundBeamsWithCollision>
        </div>
    )
}

export default HomePhotos