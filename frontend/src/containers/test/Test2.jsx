import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from "axios";


const Test = () => {

    const [sampleData, setSampleData] = useState([]);
    const [tweets, setTweets] = useState([]);
    
    useEffect(() => {

      setSampleData(sampleData);
      const tweet_apiUrl = `http://localhost:5000/tweets`;

      const fetchTweets = async () => {
        const res = await axios.get(tweet_apiUrl);
        setTweets(res.data);
      };

      fetchTweets();

    }, []);

/* 
    const FilterByWeek = (tweets) => {
        const todayDate = new Date();
        const startDayOfPrevWeek = moment(todayDate).subtract(1, 'week').startOf('week').format('LLLL');
        const lastDayOfPrevWeek = moment(todayDate).subtract(1, 'week').endOf('week').format('LLLL');

        return tweets.filter((tweet) => {
            const tweetDate = tweet.time_posted.split("T")[0]
                return moment(tweetDate).isBetween(startDayOfPrevWeek, lastDayOfPrevWeek)
            })
    };

    const FilterByMonth = (tweets) => {
        const todayDate = new Date();
        const startDayOfPrevMonth = moment(todayDate).subtract(1, 'month').startOf('month').format('LLLL');
        const lastDayOfPrevMonth = moment(todayDate).subtract(1, 'month').endOf('month').format('LLLL');
    
        return tweets.filter((tweet) => {
            const tweetDate = tweet.time_posted.split("T")[0]
            return moment(tweetDate).isBetween(startDayOfPrevMonth, lastDayOfPrevMonth) 
        })
    };

    const FilterByYear = (tweets) => {
        const todayDate = new Date()
        const startDayOfPrevYear = moment(todayDate).subtract(1, 'year').startOf('year').format('LLLL')
        const lastDayOfPrevYear = moment(todayDate).subtract(1, 'year').endOf('year').format('LLLL')

        return tweets.filter((tweet) => {
            const tweetDate = tweet.time_posted.split("T")[0]
            return moment(tweetDate).isBetween(startDayOfPrevYear, lastDayOfPrevYear) 
        })
    }; 
*/

    const SortFunction = () => {
        const sortedData = [...sampleData].sort((a,b) => {
            return a.first > b.first ? 1 : -1
        })
        setSampleData(sortedData)
    }

    const currentDate = moment();
    const allDates = ["2022-08-26", "2022-08-18", ...new Set(tweets.map(tweet => tweet.time_posted.split("T")[0]))];
    console.log(allDates)

    const filteredDay = allDates.filter(date => moment(date).isSame(currentDate, 'day'));
    console.log("Today", filteredDay)

    const filteredWeek = allDates.filter(date => moment(date).isSame(currentDate, 'week'));
    console.log("This Week", filteredWeek)

    const filteredMonth = allDates.filter(date => moment(date).isSame(currentDate, 'month'));
    console.log("This Month", filteredMonth)

    const filteredYear = allDates.filter(date => moment(date).isSame(currentDate, 'year'));
    console.log("This Year", filteredYear)
    
    // filtering date
    const dateItems = (filterItem) => {
        const currentDate = moment();
        const item =  filterItem.time_posted.split("T")[0];

        if (moment(item).isSame(currentDate, 'day')) {
            return "Past 24 Hours"
        } else if (moment(item).isSame(currentDate, 'week')) {
            return "Past Week"
        } else if (moment(item).isSame(currentDate, 'month')) {
            return "Past Month"
        } else if (moment(item).isSame(currentDate, 'year')) {
            return "Past Year"
        } else {
            return "All Time"
        }
    };

/* console.log(FilterByWeek)
console.log(FilterByMonth)
console.log(FilterByYear)
 */

let navigate = useNavigate();

    return (
        <div>
            <div>
                <Button onClick={() => { navigate("/signin"); }} >
                    Texting
                </Button>
            </div>

            <div>
                <Link to={'/'}>
                    <Button
                        type="submit" 
                        variant="contained" 
                    >
                        Sign In
                    </Button>
                 </Link>
            </div>

            {/* <div><FilterByWeek tweets={tweets} /></div>
            <div><FilterByMonth tweets={tweets} /></div>
            <div><FilterByYear tweets={tweets} /></div>
            */}
        
        </div>

    );
}

export default Test;