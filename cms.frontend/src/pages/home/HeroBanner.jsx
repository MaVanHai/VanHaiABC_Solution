import React, { useEffect, useState } from "react";
import bannerService from "../../services/bannerService";

const IMAGE_BASE_URL = "https://localhost:7218";

function HeroBanner() {
    const [banners, setBanners] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const data = await bannerService.getAllBanners();
                setBanners(data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length === 0) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [banners]);

    if (!banners.length) return null;

return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-4">

        <div className="relative w-full h-[420px] md:h-[520px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">

            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        index === current ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={IMAGE_BASE_URL + banner.imageUrl}
                        alt={banner.title}
                        className="h-full w-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-black/10"></div>

                    {/* <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-white">
                        <h1 className="text-2xl md:text-4xl font-bold">
                            {banner.title}
                        </h1>
                    </div> */}
                </div>
            ))}

        </div>

        {/* dots */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                        i === current ? "bg-white" : "bg-white/40"
                    }`}
                />
            ))}
        </div>

    </section>
);
}
export default HeroBanner;