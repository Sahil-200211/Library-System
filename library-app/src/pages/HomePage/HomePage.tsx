import { FeaturedBooks, UpcomingEvents, LibraryCard, LibraryHours, ContactUs } from "../../features/landing";
import { motion } from "framer-motion";

import './HomePage.css'


export default function HomePage(){


    return (
        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
            <div className="page">
                <div className="home-page-container">
                    <div className="home-page-left">
                        <FeaturedBooks />
                        <UpcomingEvents />
                        <LibraryCard />
                    </div>
                    <div className="home-page-right">
                        <LibraryHours />
                        <ContactUs />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}