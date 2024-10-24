import React from 'react';
import './SectionTwo.css'

function SectionTwo() {
  return (
    <div className='section-two-container'>
    <div className="section-img">
    <img src="https://t4.ftcdn.net/jpg/04/18/22/71/360_F_418227121_mGoGy7ZE2jAkq07OnN599QU7PVuhVT57.jpg" alt="" />
    </div>
    <div className="search-component">
    <form action="">
    <input type="text" placeholder="Search food" name="search"/>
    </form>
    </div>
    </div>
  )
}

export default SectionTwo;
