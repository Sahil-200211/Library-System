import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/ReduxStore";
import { loadBookByBarcode } from "../../redux/slices/BookSlice";
import { BookOverview } from "../../features/book/components/BookOverview/BookOverview";
import { motion } from "framer-motion";

export default function ResourcePage(){
    const dispatch:AppDispatch = useDispatch();

    const bookState = useSelector((state:RootState) => state.book);

    const {barcode} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if(barcode){
            dispatch(loadBookByBarcode(barcode));
        }

        if(bookState.error) navigate("/catalog");
    }, [bookState.error, barcode]);

    return (
        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}>
            <div className="page">
                <div className="page-container">
                    <BookOverview />
                </div>
            </div>
        </motion.div>
    )
}