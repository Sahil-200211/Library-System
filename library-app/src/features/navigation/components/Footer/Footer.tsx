import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import React, { useState } from "react";
import {motion} from "framer-motion";

import "./Footer.css";

export const Footer: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [modalText, setModalText] = useState("");
    const [closing, setClosing] = useState(false);

    const openLink = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleOpen = (text: string) => {
        setModalText(text);
        setOpen(true);
        setClosing(false);
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => setOpen(false), 300);
    };

    return (
        <div className="footer">
            <motion.p className="footer-text" onClick={() => openLink("https://earth.google.com/web/search/41%2e303921,+-81%2e901693/@41.30381919,-81.90192293,250.04914326a,408.02833279d,35y,-134.9845906h,59.99830379t,360r/data=CiwiJgokCfNaIVXSuS5AEWQD0yf4ty5AGRdxgWEhdlJAITFr9z2xdVJAQgIIAToDCgEwQgIIAEoNCP___________wEQAA")} whileHover={{scale: 1.05}} transition={{type: "spring", stiffness: 400}}>
                Fictionville, Biblioland - 123456
            </motion.p>
            <motion.p className="footer-text" onClick={() => handleOpen("We got a return policy before GTA 6. So return your books on time, or we’ll delay your borrowing privileges… indefinitely. At this rate, you’ll get your next book when GTA 7 is announced.")} whileHover={{scale: 1.05}} transition={{type: "spring", stiffness: 400}}>Return Policy</motion.p>
            <motion.p className="footer-text" onClick={() => handleOpen("With great power comes great responsibility… and that includes returning books on time. If you're late, expect Spider-Man to swing by and web your wallet!")} whileHover={{scale: 1.05}} transition={{type: "spring", stiffness: 400}}>Late Fees</motion.p> 
            <motion.p className="footer-text" onClick={() => handleOpen("Lose your library card? That’s a de-merit. Do it twice? That’s a double de-merit. Three times? Dwight declares you an enemy of the library. Four times? Kevin drops a pot of chili on your reading list. Five times? Michael bans you but immediately unbans you because he ‘loves books!’ Just… don’t lose it, okay?")} whileHover={{scale: 1.05}} transition={{type: "spring", stiffness: 400}}>Library Card Conditions</motion.p>
            <div className="footer-social-cluster">
                <p className="footer-social-text">Socials</p>
                <YouTube className="footer-social" onClick={() => openLink("https://youtu.be/CwOrp6Q7kCE?si=mnK313KZ3c8pzdU5")} />
                <Twitter className="footer-social" onClick={() => openLink("https://x.com/catreadingbooks")} />
                <Facebook className="footer-social" onClick={() => openLink("https://www.facebook.com/share/p/18cZwQAPxi/")} />
                <Instagram className="footer-social" onClick={() => openLink("https://www.instagram.com/p/BgSlRglAKBn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==")} />
            </div>

            {open && (
                <div className={`modal-backdrop ${closing ? "hide" : ""}`}>
                    <div className="modal-box">
                        <p>{modalText}</p>
                        <button className="close-button" onClick={handleClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};
