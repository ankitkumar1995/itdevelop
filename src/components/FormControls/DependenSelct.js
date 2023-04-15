import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
    borderRadius: '10px',
    marginTop: '20px',
    '& .MuiInput-underline:before': {
      border: 'none',
    },
  },
  formControl1: {
    minWidth: 'auto',
    marginTop: '20px',
    borderBottom: '5px solid #ef6e56',
    '& .MuiInput-underline:before': {
      border: 'none',
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    '& .MuiSelect-select.MuiSelect-select': {
      margin: '4px 4px 0 4px',
    },
  },
  menuitem: {
    direction: 'rtl',
  },
  menuitemhidden: {
    display: 'none',
  },
}));

const DependentSelect = (props) => {
  const classes = useStyles();

  const [types, setTypes] = useState(props.dropDownData[0].type);
  const [subType, setSubType] = useState(
    props.dropDownData[0].subType[0].subtypeandaction.label
  );
  const [suggestAction, setSuggestAction] = useState(
    props.dropDownData[0].subType[0].subtypeandaction.suggestedAction
  );
  const handleChangeType = (event) => {
    setTypes(event.target.value);
    const data = props.dropDownData.find(
      ({ type }) => type === event.target.value
    ).subType[0].subtypeandaction.label;
    const actionData = props.dropDownData.find(
      ({ type }) => type === event.target.value
    ).subType[0].subtypeandaction.suggestedAction;
    setSubType(data);
    setSuggestAction(actionData);
  };
  const handleChangeSubtype = (event) => {
    setSubType(event.target.value);
    const mapData = props.dropDownData.find(({ type }) => type === types);
    const actionData = mapData?.subType?.find(
      ({ subtypeandaction }) => subtypeandaction.label === event.target.value
    );

    setSuggestAction(actionData?.subtypeandaction?.suggestedAction);
  };
  return (
    <>
      <div className="looking-content">
        <p>{props.title}</p>
        <div className="home-drop-content">
          <h3 style={{ width: '80%' }}>
            {props.path === 'kn' ? 'ನಾನು ಒಬ್' : 'I am a'}
            {''}
            <span
              style={{ margin: '0 20px', display: 'inline-flex' }}
              className="title-content"
            >
              <FormControl className={classes.formControl}>
                <Select
                  name={'gType'}
                  className={classes.select}
                  value={types}
                  onChange={handleChangeType}
                >
                  {' '}
                  {props.dropDownData.map((item, index) => (
                    <MenuItem value={item.type} key={item.type}>
                      {item.type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </span>
            {props.path === 'kn' ? 'ಹುಡುಕುವುದು' : 'looking for'} {''}
            <div className="looking-dropdown">
              <FormControl className={classes.formControl1}>
                <Select
                  name="gSubType"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={subType}
                  onChange={handleChangeSubtype}
                  disabled={!types}
                >
                  {types
                    ? props.dropDownData
                        .find(({ type }) => type === types)
                        ?.subType?.map((item, index) => {
                          return (
                            <MenuItem
                              value={item.subtypeandaction.label}
                              key={item.subtypeandaction.label}
                            >
                              {item.subtypeandaction.label}
                            </MenuItem>
                          );
                        })
                    : []}
                </Select>
              </FormControl>
            </div>
          </h3>
        </div>
      </div>
      <div className="ation-wp">
        <p>{props.path === 'kn' ? 'ಸೂಚಿಸಿದ ಕ್ರಮಗಳು' : 'Suggested Actions'}</p>
        <div className="action-fx">
          {suggestAction?.map((item, index) => (
            <>
              <a href={item?.actionLabel?.url || '#'}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.actionLabel?.title,
                  }}
                />
              </a>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default DependentSelect;
