import { useState } from 'react';
import './dropdownmenu.css';

function DropDownMenu(props) {
  
  const [displayMenu, setDisplayMenu] = useState(false);
  
  let handleChange = (selection) => {
    setDisplayMenu(false);
    if (props.onChange) {
      props.onChange(selection);
    }
  }

  let getSelectedLabel = () => {
    let label = null;
    if (props.menu && props.menu.length > 0) {
      let currentItem = props.menu.filter(
        (item) => item.id === props.selected
      );
      if (currentItem.length > 0) {
        label = currentItem[0].label;
      }
    }
    return label;
  };  

  return (
    <div className="dropdown-container">
      <div
        className="dropdown-input"
        onClick={() => setDisplayMenu(!displayMenu)}
      >
        <div className="dropdown-label">{getSelectedLabel()}</div>
        <div className={`dropdown-arrow dropdown-${displayMenu ? 'up' : 'down'}`} />
      </div>
      {displayMenu ? 
        <div className="dropdown-menu">
          {props.menu.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${item.id === props.selected ? "menu-item-selected" : ""}`}
              onClick={() => handleChange(item.id)}
            >
              {item.label}
            </div>
          ))}
        </div>
        : null
      }
    </div>
  );
}

export default DropDownMenu;