import { useState, useEffect } from "react";

const images = [
    "https://bizweb.dktcdn.net/100/330/208/files/hinh-nen-7-vien-ngoc-rong-21.jpg?v=1655530366216",
    "https://images2.alphacoders.com/125/1255552.jpg",
    'https://file.vfo.vn/hinh/2014/5/anh-bia-one-piece-12.jpg',
    'https://file.hstatic.net/200000462939/article/319552970_1283473812215809_8451918105833455952_n_a885482dad53456d935ad2be8b2ff665.jpg'
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden w-full h-[450px] bg-gray-300 mb-8">
            <div
                className="flex transition-transform duration-1000 h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="w-full h-full flex items-center justify-center flex-shrink-0"
                    >
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )
                )}
            </div>
        </div>


    );
};

export default Banner;
