import { FlipWords } from "./ui/flip-words";

function CategoryTitles() {
    const words = ["Better", "Sleek", "Modern"];

    return (
        <div className="my-16">
            <div className="text-6xl portrait:text-3xl max-w-5xl px-5 mx-auto  font-normal text-neutral-700 poppins-semibold">
                Get{' '}
                <FlipWords words={words} /> <br />
                Fashion by Categories
            </div>

        </div>
    )
}

export default CategoryTitles