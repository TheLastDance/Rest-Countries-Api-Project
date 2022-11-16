import { useEffect, useState } from "react";
import ContentInputs from "./child elements/content_inputs";
import Countries from "./child elements/countries";

function ContentFirstPage({ api }) {
    const [search, setSearch] = useState('');
    const [regionFilter, setRegionFilter] = useState('Filter by region');
    const [filterBy, setFilterBy] = useState({
        bySearch: false,
        byRegion: false,
        byLetter: false
    });

    function searchFunc(e) {
        const val = e.target.value.toLowerCase();
        setSearch(val.trim());
        setRegionFilter('Filter by region');
        setFilterBy({ bySearch: true, byRegion: false, byLetter: false });
    }

    function letterFunc(e) {
        setSearch(e.target.textContent);
        setRegionFilter('Filter by region');
        setFilterBy({ bySearch: false, byRegion: false, byLetter: true });
    }

    function regionFunc(e) {
        const val = e.target.textContent;
        if (val === 'All') {
            setSearch('');
        } else {
            setSearch(val);
        }
        setRegionFilter(val);
        setFilterBy({ bySearch: false, byRegion: true, byLetter: false });
    }

    useEffect(() => {
        const data1 = window.sessionStorage.getItem('search');
        const data2 = window.sessionStorage.getItem('filterBy');
        const data3 = window.sessionStorage.getItem('regionFilter');
        if (data1 !== null) setSearch(JSON.parse(data1));
        if (data2 !== null) setFilterBy(JSON.parse(data2));
        if (data3 !== null) setRegionFilter(JSON.parse(data3));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('search', JSON.stringify(search));
        sessionStorage.setItem('filterBy', JSON.stringify(filterBy));
        sessionStorage.setItem('regionFilter', JSON.stringify(regionFilter));
    }, [search, filterBy, regionFilter]);


    return (
        <div className='content'>
            <ContentInputs searchFunc={searchFunc} letterFunc={letterFunc} regionFunc={regionFunc} regionFilter={regionFilter} />
            <Countries api={api} search={search} filterBy={filterBy} />
        </div>
    )
}

export default ContentFirstPage;