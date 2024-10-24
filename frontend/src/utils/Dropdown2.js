import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function Dropdown2({ selectedOption, onChange }) {
  // const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (eventKey) => {
    onChange(eventKey);
  };

  const options = ['Regular', 'Medium', 'Big'];

  const dropdownItems = options.map((option) => (
    <Dropdown.Item key={option} eventKey={option}>
      {option}
    </Dropdown.Item>
  ));

  return (
    <DropdownButton
      as={ButtonGroup}
      title={selectedOption !== null ? selectedOption : "Regular"}
      id="dropdown-split-basic"
      drop="down"
      variant='secondary'
      onSelect={handleSelect}
    >
      {dropdownItems}
    </DropdownButton>
  );
}

export default Dropdown2;
