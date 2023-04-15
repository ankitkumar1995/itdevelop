import React, { useEffect, useState } from 'react';
import BackDrop from '../Backdrop/BackDrop';

const NiceSelect = ({ options, defaultValue, setSelected }) => {
  let [open, setOpen] = useState(false);
  let [current, setCurrent] = useState(
    defaultValue ? defaultValue : options[0]
  );
  useEffect(() => {
    setCurrent(defaultValue);
  }, [defaultValue]);
  return (
    <React.Fragment>
      <BackDrop show={open} clicked={() => setOpen(false)} />
      <select className="nice-select" style={{ display: 'none' }}>
        {options.map((option, index) => {
          return (
            <option
              key={option.value}
              data-display={option.default ? option.lable : null}
              value={option.value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
      <div
        className={open ? 'nice-select open' : 'nice-select'}
        tabIndex="0"
        onClick={() => setOpen(!open)}
      >
        <span className="current">
          {current.label ? current.label : options[0].label}
        </span>
        <ul className="list">
          {options.map((option, index) => {
            return (
              <li
                key={option.value}
                className={
                  current.value === option.value
                    ? 'option selected focus'
                    : 'option'
                }
                data-display={option.default ? option.lable : null}
                data-value={option.value}
                onClick={() => {
                  setCurrent(option);
                  setSelected(option);
                  //option.sortFunc();
                  index === 0 && option.setType('asc');
                  index === 1 && option.setType('desc');
                }}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};
export default NiceSelect;
