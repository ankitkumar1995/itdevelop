import React, { useEffect, useState, useRef, createRef } from 'react';
import _, { toLower } from 'lodash';

const CategoryFilter = (props) => {
  const { info, id, removedKey, active, clearAll } = props;
  let [filterList, setFilterlist] = useState([]);
  let [filterOptions, setFilteroptions] = useState(info);
  let check = useRef(info.options.map(() => createRef()));

  useEffect(() => {
    // resetting filters based on active tab
    setFilterlist([]);
    _.forEach(check.current, (current) => {
      if (current.current) {
        current.current.checked = false;
      }
    });
  }, [active, clearAll]);

  useEffect(() => {
    setFilteroptions(info);
  }, [active]);

  useEffect(() => {
    const index = _.findIndex(check.current, (item) => {
      return item.current?.id === removedKey;
    });
    if (index >= 0) {
      check.current[index].current.checked = false;
    }
    setFilterlist(_.filter(filterList, (item) => item.key === removedKey));
  }, [removedKey]);

  const setSelected = (type, checked, value) => {
    let list = [...filterList];
    if (!checked) {
      list = _.filter(filterList, (item) => item.key !== value.key);
    } else if (checked) {
      list.push(value);
    }
    setFilterlist(list);
    props.setFilters(type, list);
  };

  const getFilterdOptions = (value) => {
    let list = { ...filterOptions };
    list.options = _.filter(filterOptions.options, (option) => {
      return _.includes(toLower(option.value), toLower(value));
    });
    setFilteroptions(value === '' ? info : list);
  };
  return (
    <li>
      <a
        target="_blank"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${id}`}
        aria-expanded="false"
      >
        {filterOptions.title}
        <i className="fa fa-plus plus"></i>
        <i className="fa fa-minus minus"></i>
      </a>
      <div className="clps-wp collapse" id={id}>
        {filterOptions.search ? (
          <div className="clps-search">
            <input
              type="text"
              placeholder={'Search for ' + filterOptions.title}
              onChange={(event) => getFilterdOptions(event.target.value)}
            />
            <span>
              <i className="fa fa-search"></i>
            </span>
          </div>
        ) : null}
        {filterOptions.options?.map((item, index) => (
          <div className="single-checkbox" key={item.key}>
            <div style={{ display: 'flex' }} className="custom-check">
              <input
                className="custom-check-input"
                id={item.key + '_' + id}
                name={item.key + '_' + id}
                type="checkbox"
                ref={check.current[index]}
                onChange={(event) =>
                  setSelected(filterOptions.key, event.target.checked, item)
                }
              />
              <label
                className="custom-check-elem"
                htmlFor={item.key + '_' + id}
              ></label>
              <label
                className="custom-check-label"
                htmlFor={item.key + '_' + id}
              >
                {item.value}
              </label>
            </div>
          </div>
        ))}
      </div>
    </li>
  );
};

export default CategoryFilter;
