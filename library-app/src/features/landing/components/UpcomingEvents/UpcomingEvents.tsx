import React from "react";

import './UpcomingEvents.css';
import { AutoAwesome } from "@mui/icons-material";
import { Typography } from "@mui/material";

export const UpcomingEvents:React.FC = () => {
    return (
        <div className="upcoming-events-event">
            <div className="upcoming-events-header-group">
                <AutoAwesome sx={{
                    fontSize:"2.25rem",
                    color: "#3626A7" 
                }} />
                <Typography variant="h2" fontWeight={700}>Upcoming Events</Typography>
                <AutoAwesome sx={{
                    fontSize:"2.25rem",
                    color: "#3626A7"
                }} />
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