import { useLocation } from "react-router-dom";
import { CatalogOverview, CatalogSearch } from "../../features/catalog";
import { motion } from "framer-motion";

export default function CatalogPage(){
    const location = useLocation();

    return (
        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
            <div className="page">
                <div className="page-container">
                    {
                        location.search === ""?
                        <CatalogOverview /> : 
                        <CatalogSearch />
                    }
                </div>
            </div>
        </motion.div>
    )
}