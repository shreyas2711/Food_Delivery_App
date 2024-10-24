import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function DropdownMenu({ n }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  
  };

  const options = [];

  // Generate options from 1 to n
  for (let i = 1; i <= n; i++) {
    options.push(<Dropdown.Item key={i} eventKey={i}>{i}</Dropdown.Item>);
  }

  return (
    <DropdownButton  style={{margin:'13px'}} 
      as={ButtonGroup}
      title={selectedOption !== null ? selectedOption : "1"} 
      id="dropdown-split-basic"
      drop="down"
      variant='secondary'
      onSelect={handleSelect} 
    >
      {options}
    </DropdownButton>
  );
}

export default DropdownMenu;
