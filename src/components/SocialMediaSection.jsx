import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { IoShareSocialSharp } from "react-icons/io5";


// Helper function to get iframe URL based on embed type
const getEmbedUrl = (embedType, embedId) => {
    switch (embedType) {
        case "Facebook":
            // Facebook Page Plugin embed
            // NOTE: Replace 'YOUR_APP_ID' with your actual Facebook App ID
            // Get your App ID from: https://developers.facebook.com/apps/
            // embedId should be your Facebook page username (without @)
            return `https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${embedId}&tabs=timeline&width=280&height=350&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=YOUR_APP_ID`;

        case "X":
            // Twitter embed using Tweet ID
            // To get tweet ID: Copy tweet URL, extract the long number after /status/
            // Example: https://twitter.com/username/status/123456789 -> embedId: "123456789"
            // For proper embedding, you'll need to use Twitter's embed code generator:
            // https://publish.twitter.com/
            // This URL serves as a fallback
            return `https://platform.twitter.com/embed/Tweet.html?dnt=true&theme=light&id=${embedId}`;

        case "Instagram":
            // Instagram post embed
            // To get post code: Visit post, copy URL, extract the code after /p/
            // Example: https://www.instagram.com/p/ABC123XYZ/ -> embedId: "ABC123XYZ"
            return `https://www.instagram.com/p/${embedId}/embed`;

        case "Youtube":
            // Instagram post embed
            // To get post code: Visit post, copy URL, extract the code after /p/
            // Example: https://www.instagram.com/p/ABC123XYZ/ -> embedId: "ABC123XYZ"
            return `https://www.instagram.com/p/${embedId}/embed`;

        default:
            return null;
    }
};

// Social Media Card Component
const SocialMediaCard = ({ card }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const embedUrl = getEmbedUrl(card.embedType, card.embedId);

    const handleLoad = () => setIsLoading(false);
    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    const getIcon = () => {
        switch (card.icon) {
            case "Facebook":
                return <FaFacebookF className="w-3 h-3 sm:w-4 sm:h-4" />;
            case "X":
                return <RiTwitterXLine className="w-3 h-3 sm:w-4 sm:h-4" />;
            case "Instagram":
                return <FaInstagram className="w-3 h-3 sm:w-4 sm:h-4" />;
            case "Youtube":
                return <FaYoutube className="w-3 h-3 sm:w-4 sm:h-4" />;
            default:
                return null;
        }
    };

    if (!embedUrl) {
        return null;
    }

    return (
        <article className="bg-white w-56 xs:w-64 sm:w-80 rounded-lg shadow flex-shrink-0 relative">
            <div className="flex justify-between items-center mb-1 sm:mb-2 px-2 sm:px-4 pb-0 pt-2">
                <div className="flex items-center gap-1 sm:gap-2 text-primary-700 font-semibold">
                    <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-700 text-white">
                        {getIcon()}
                    </span>
                    <span className="text-xs sm:text-sm">{card.platform}</span>
                </div>
                <span className="text-primary-700 text-[10px] sm:text-sm">{card.account}</span>
            </div>

            <div className="h-32 xs:h-44 sm:h-72 overflow-hidden border-t-2 border-primary-700 rounded-lg mb-1 sm:mb-2 relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    </div>
                )}

                {hasError ? (
                    <div className="h-full flex items-center justify-center p-4">
                        <p className="text-xs text-gray-500 text-center">
                            Unable to load social media content. Please check the embed ID.
                        </p>
                    </div>
                ) : (
                    <iframe
                        src={embedUrl}
                        height="100%"
                        width="100%"
                        style={{ border: "none", overflow: "hidden" }}
                        scrolling="no"
                        allowTransparency="true"
                        allow="encrypted-media"
                        onLoad={handleLoad}
                        onError={handleError}
                        title={`${card.platform} embed for ${card.account}`}
                        loading="lazy"
                        className="w-full h-full"
                    />
                )}
            </div>
        </article>
    );
};

export default function SocialMediaSection({ data }) {
    const containerRef = useRef(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);

    const CARD_WIDTH_PX = 320; // w-80 = 20rem = 320px
    const GAP_PX = 16; // gap-4 = 1rem
    const SCROLL_AMOUNT = CARD_WIDTH_PX + GAP_PX;

    const updateButtons = () => {
        const el = containerRef.current;
        if (!el) return;
        setCanLeft(el.scrollLeft > 0);
        setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        updateButtons();
        const t = setTimeout(updateButtons, 100);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onScroll = () => updateButtons();
        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateButtons);
        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateButtons);
        };
    }, []);

    const scrollLeft = () => containerRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    const scrollRight = () => containerRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

    return (
        <section className="bg-primary-800 p-2 sm:p-6">
            <h2 className="text-white text-base sm:text-xl font-bold mb-2 sm:mb-4 flex items-center gap-2 ml-2 sm:ml-12">
                <span><IoShareSocialSharp size={18} className="sm:w-6 sm:h-6" /></span> SOCIAL MEDIA
            </h2>

            {/* Wrapper with arrows and row inside flex */}
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Left Arrow */}
                <button
                    onClick={scrollLeft}
                    disabled={!canLeft}
                    aria-label="Scroll left"
                    className={`rounded-full p-1 sm:p-2 shadow ${canLeft ? "bg-white hover:bg-gray-200" : "bg-white/50 cursor-not-allowed"
                        }`}
                >
                    <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700" />
                </button>

                {/* Scrollable Row */}
                <div
                    ref={containerRef}
                    className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 sm:py-2 flex-1"
                >
                    {data.map((card, i) => (
                        <SocialMediaCard key={`${card.platform}-${card.account}-${i}`} card={card} />
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={scrollRight}
                    disabled={!canRight}
                    aria-label="Scroll right"
                    className={`rounded-full p-1 sm:p-2 shadow ${canRight ? "bg-white hover:bg-gray-200" : "bg-white/50 cursor-not-allowed"
                        }`}
                >
                    <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-700" />
                </button>
            </div>
        </section>
    );
}
