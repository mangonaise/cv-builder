import React, { useState} from 'react';

const CvName = (props) => {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ tempName, setTempName ] = useState('');

  function makeEditable(event) {
    if (isEditing) return;
    event.stopPropagation();
    setTempName(props.title);
    setIsEditing(true);
    Promise.resolve().then(() => document.getElementById(`input${props.titlePlaceholder}`).focus());
  }

  let align = props.alignRight ? 'flex-end' : 'flex-start';
  let content = props.title === '' ? props.titleFallback : props.title

  return (
    <div style={{alignSelf: align}}>
      <div className="editable-item" style={{display: isEditing ? 'none' : 'block'}} onClick={makeEditable}>
        {props.small ? <p>{content}</p> : <h2>{content}</h2>}
      </div>

      <div className="being-edited" style={{display: isEditing ? 'block' : 'none'}}>
        <form onSubmit={event => {event.preventDefault(); props.onEdit(tempName); setIsEditing(false)}}>
          <input 
            id={`input${props.titlePlaceholder}`}
            placeholder={props.titlePlaceholder} 
            type="text" 
            value={tempName} 
            onChange={event => setTempName(event.target.value)}
          />
          <button type="submit" className="done-editing-button">Done</button>
        </form>
      </div>
    </div>
  );
}

export default CvName;