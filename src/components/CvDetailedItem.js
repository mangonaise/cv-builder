import React, { useState } from 'react';

const CvItem = (props) => {
  const { id, title, yearStart, yearEnd, description } = props.data;

  const [ isEditing, setIsEditing ] = useState(false);
  const [ tempTitle, setTempTitle ] = useState('');
  const [ tempYearStart, setTempYearStart ] = useState('');
  const [ tempYearEnd, setTempYearEnd ] = useState('');
  const [ tempDescription, setTempDescription ] = useState('');

  function makeEditable(event) {
    if (isEditing) return;

    event.stopPropagation();

    setTempTitle(title);
    setTempYearStart(yearStart);
    setTempYearEnd(yearEnd);
    setTempDescription(description);
    setIsEditing(true);
  }

  function editField(event, callStateSetter) {
    callStateSetter(event.target.value);
  }

  function submitItem() {
    props.onEdit({
      id,
      title: tempTitle,
      yearStart: tempYearStart,
      yearEnd: tempYearEnd,
      description: tempDescription
    })

    setIsEditing(false);
  }

  let jsx;

  if (isEditing) {
    jsx = 
    <div className="cv-item being-edited">
      <div className="flex-space-between">
        <input 
          style={{flexGrow: 2}}
          placeholder='Title' 
          type="text" 
          value={tempTitle} 
          onChange={event => editField(event, setTempTitle)}
        />
        {!props.noDates && 
          <div>
            <input 
              placeholder='From' 
              type="text" 
              value={tempYearStart} 
              onChange={event => editField(event, setTempYearStart)}
              style={{marginLeft: '4px'}}
            />
            <span> - </span>
              <input 
              placeholder='Until' 
              type="text" 
              value={tempYearEnd} 
              onChange={event => editField(event, setTempYearEnd)}
            />
          </div>
      }  
      </div>
      <textarea 
        placeholder='Description' 
        style={{width: '100%'}} 
        type="text" 
        value={tempDescription} 
        onChange={event => editField(event, setTempDescription)}
      />
      <button className="done-editing-button" onClick={submitItem}>Done</button>
      <button className="remove-item-button" onClick={props.onDelete}>Remove</button>
    </div>
  } else {
    jsx = 
    <div onClick={makeEditable} className="cv-item editable-item">
      <div className="flex-space-between">
        <h3>{title === '' ? props.titleFallback : title}</h3>
        <div>
          <span>{yearStart}</span>
          {(yearStart && yearEnd) && <span> - </span>}
          {(yearStart && yearEnd) && <span>{yearEnd}</span>}
        </div>
      </div>
      {description && <p className="cv-item-description">{description}</p>}
    </div>
  }

  return jsx;
}

export default CvItem;