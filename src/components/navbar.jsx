import { Link } from 'react-router-dom';
import { ReactComponent as DarkIcon } from '../svg/moon.svg'; //icon
import { ReactComponent as LightIcon } from '../svg/sun.svg'; //icon


function Navbar({ mode, changeMode }) {
    //changed
    return (
        <div className='bar'>
            <Link to="/Rest-Countries-Api-Project/build/"><h2>Where in the world?</h2></Link>
            <div className="colormode" onClick={changeMode}>
                <div className='effect'></div>
                {!mode || mode === null ? <>
                    <DarkIcon />
                    <p>Dark Mode</p>
                </> : <>
                    <LightIcon />
                    <p>Light Mode</p>
                </>}
            </div>
        </div>
    )
}

export default Navbar;