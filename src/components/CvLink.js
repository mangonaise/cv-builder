import React, { useState } from 'react';

const CvLink = (props) => {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ tempText, setTempText ] = useState('');
  const [ tempDestination, setTempDestination ] = useState('');

  function makeEditable(event) {
    if (isEditing) return;
    event.stopPropagation();
    event.preventDefault();
    setTempText(props.text);
    setIsEditing(true);
  }

  function submitLink() {
    props.onEdit({
      id: props.id, 
      text: tempText, 
      destination: tempDestination
    });

    setIsEditing(false);
  }

  let jsx;

  if (isEditing) {
    jsx = 
    <div className="cv-link">
      <input
        placeholder="Link text"
        type="text" 
        value={tempText} 
        onChange={event => setTempText(event.target.value)}
      />
      <input
        placeholder="Link destination"
        type="text" 
        value={tempDestination} 
        onChange={event => setTempDestination(event.target.value)}
        style={{marginLeft: '4px'}}
      />
      <button className="done-editing-button" onClick={submitLink}>Done</button>
      <button className="remove-item-button" onClick={props.onDelete}>Remove</button>
    </div>
  } else {
    jsx = 
    <div className="cv-link">
      <a 
        href={props.destination ?? '#'} 
        rel="noreferrer"
        target="_blank">{props.text === '' ? props.textFallback : props.text}
      </a>
      <button className="edit-link-button" onClick={makeEditable} style={{marginLeft: '1rem'}}>Edit</button>
    </div>
  }

  return jsx;
}

export default CvLink;