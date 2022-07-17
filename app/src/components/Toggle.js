import React, { useEffect, useState } from 'react';
import { setTheme } from '../utils/themes';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Toggle = () => {
    library.add(faMoon, faSun);
  const [togClass, setTogClass] = useState('dark');
  let theme = localStorage.getItem('theme');

  const handleOnClick = () => {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        setTogClass('light')
    } else {
        setTheme('theme-dark');
        setTogClass('dark')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTogClass('dark')
    } else if (localStorage.getItem('theme') === 'theme-light') {
        setTogClass('light')
    }
    }, [theme])

  return (
        <div className="container--toggle">
            {
                togClass === "light" ?
                <FontAwesomeIcon icon="moon" id="toggle" className="toggle--checkbox" onClick={handleOnClick} size="2x"  />
                :
                <FontAwesomeIcon icon="sun" id="toggle" className="toggle--checkbox" onClick={handleOnClick} size="2x"  />
            }
            <label htmlFor="toggle" className="toggle--label">
                <span className="toggle--label-background"></span>
            </label>
        </div>
    )
}

export default Toggle;
