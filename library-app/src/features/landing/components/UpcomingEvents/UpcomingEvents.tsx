import React from "react";

import './UpcomingEvents.css';
import { Typography } from "@mui/material";

export const UpcomingEvents:React.FC = () => {
    return (
        <div className="upcoming-events-event">
            <div className="upcoming-events-header-group">
               <svg xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="sparkle-svg">
                    <path d="M11.644 1.94a.75.75 0 011.347 0l1.633 3.306a.75.75 0 00.336.336l3.306 1.634a.75.75 0 010 1.347l-3.306 1.633a.75.75 0 00-.336.336l-1.633 3.306a.75.75 0 01-1.347 0l-1.633-3.306a.75.75 0 00-.336-.336L6.705 8.563a.75.75 0 010-1.347l3.306-1.633a.75.75 0 00.336-.336L11.644 1.94zM5.75 15a.75.75 0 01.75.75v.042c0 .875.709 1.583 1.583 1.583h.042a.75.75 0 010 1.5h-.042a3.083 3.083 0 01-3.083-3.083v-.042a.75.75 0 01.75-.75zm13.5 1.5a.75.75 0 00-.75.75v.042a3.083 3.083 0 01-3.083 3.083h-.042a.75.75 0 000 1.5h.042a4.583 4.583 0 004.583-4.583v-.042a.75.75 0 00-.75-.75z"/>
                </svg>
                <Typography variant="h2" fontWeight={700}>Upcoming Events</Typography>
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="sparkle-svg">
                    <path d="M11.644 1.94a.75.75 0 011.347 0l1.633 3.306a.75.75 0 00.336.336l3.306 1.634a.75.75 0 010 1.347l-3.306 1.633a.75.75 0 00-.336.336l-1.633 3.306a.75.75 0 01-1.347 0l-1.633-3.306a.75.75 0 00-.336-.336L6.705 8.563a.75.75 0 010-1.347l3.306-1.633a.75.75 0 00.336-.336L11.644 1.94zM5.75 15a.75.75 0 01.75.75v.042c0 .875.709 1.583 1.583 1.583h.042a.75.75 0 010 1.5h-.042a3.083 3.083 0 01-3.083-3.083v-.042a.75.75 0 01.75-.75zm13.5 1.5a.75.75 0 00-.75.75v.042a3.083 3.083 0 01-3.083 3.083h-.042a.75.75 0 000 1.5h.042a4.583 4.583 0 004.583-4.583v-.042a.75.75 0 00-.75-.75z"/>
                </svg>
            </div>
            <Typography variant="h3" fontWeight={650}>This Summer</Typography>
            <h4>Tuesday's : 10 AM - 12 PM</h4>
            <ul className="upcoming-events">
                <Typography variant="h5" fontWeight={500}> WHO: </Typography>
                <li><p>Childern to 6th Grade</p></li>
                <Typography variant="h5" fontWeight={500}>Activities: </Typography>
                <li><p>Logic Puzzles</p></li>
                <li><p>Scratch Programming</p></li>
                <li><p>DIY Craft Projects</p></li>
                <li><p>Storytelling and Creative Writing</p></li>
            </ul>
            <h4>Wednesday's : 10 AM - 12 PM</h4>
            <ul className="upcoming-events">
                <Typography variant="h5" fontWeight={500}> WHO: </Typography>
                <li><p>Adults (19+)</p></li>
                <Typography variant="h5" fontWeight={500}>Activities: </Typography>
                <li><p>Craft & Sip</p></li>
                <li><p>Photography Basics</p></li>
                <li><p>Book Club Discussion</p></li>
                <li><p>Pottery or Clay Modelling</p></li>
            </ul>
            <h4>Thursday's : 10 AM - 12 PM</h4>
            <ul className="upcoming-events">
                <Typography variant="h5" fontWeight={500}> WHO: </Typography>
                <li><p>Teens - 7th to 12th Grade</p></li>
                <Typography variant="h5" fontWeight={500}>Activities: </Typography>
                <li><p>Web Programming</p></li>
                <li><p>Game Development</p></li>
                <li><p>Digital Art and Illustration</p></li>
                <li><p>Music Production with Software</p></li>
            </ul>
            <h4>Saturday's : 10 AM - 12 PM</h4>
            <ul className="upcoming-events">
                <Typography variant="h5" fontWeight={500}> WHO: </Typography>
                <li><p>All Ages</p></li>
                <Typography variant="h5" fontWeight={500}>Activities: </Typography>
                <li><p>Gardening and Plant Care</p></li>
                <li><p>Virtual Reality Gaming Experience</p></li>
                <li><p>Cooking Simple Recipes</p></li>
            </ul>
        </div>
    )
}