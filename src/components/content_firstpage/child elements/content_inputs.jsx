import { useEffect, useRef, useState } from "react";
import { ReactComponent as SearchIcon } from '../../../svg/search_icon.svg'; //icon
import { ReactComponent as ChevronDown } from '../../../svg/chevronDown.svg'; //icon


function ContentInputs({ searchFunc, letterFunc, regionFunc, regionFilter }) {
    const [letter, setLetters] = useState([]);
    const regions = ['All', 'Africa', 'Antarctic', 'America', 'Asia', 'Europe', 'Oceania'];
    const [regionSelect, setRegionSelect] = useState(false);
    const clickOutside = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {

            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setRegionSelect(false);
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(clickOutside);

    useEffect(() => {
        setLetters(Array.from({ length: 90 - 65 + 1 }, (_, i) => 65 + i).map(item => String.fromCharCode(item)));
    }, [])


    return (
        <div className='content_inputs'>
            <span><SearchIcon /><input type="search" placeholder='Search for a country...' onChange={searchFunc} /></span>
            <span className='letter_search' onClick={letterFunc}>
                {letter.map((item, index) => <span key={index}>{item}</span>)}
            </span>
            <div className='dropdown' ref={clickOutside}>
                <div className='title' onClick={() => setRegionSelect(prev => !prev)}>
                    <p>{regionFilter}</p>
                    <ChevronDown />
                </div>
                {regionSelect ? <div className='drop_menu' onClick={regionFunc}>
                    {regions.map((item, index) => <div className='regions' key={index} value={item}>{item}</div>)}
                </div> : null}
            </div>
        </div>
    )
}

export default ContentInputs;