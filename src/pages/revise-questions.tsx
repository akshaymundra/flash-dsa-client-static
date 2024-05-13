import CardScroller from "@/components/q-view/card-scroller";
import { useEffect, useState } from "react";
import data from "@/data/flash-dsa-data.json";
import { DataRowProps } from "@/types";

const ReviseQuestions = () => {

    const [filteredData, setFilteredData] = useState(data);
    const params = new URLSearchParams(window.location.search);
    const topics = params.get('topic')?.split(',');
    const levels = params.get('level')?.split(',');

    // filter according to the url query 
    useEffect(() => {
        const allTopics = topics?.includes('all');
        const allLevels = levels?.includes('all');

        let filterProcessData = data;
        if (!allTopics) {
            filterProcessData = data.filter((item: DataRowProps) => topics?.includes(item.topic));
        }
        if (!allLevels) {
            filterProcessData = filterProcessData.filter((item: DataRowProps) => levels?.includes(item.level));
        }

        setFilteredData(filterProcessData);
    }, [])

    return (
        <>
            {data &&
                <> <CardScroller data={filteredData} /> </>
            }
        </>
    );
}

export default ReviseQuestions;