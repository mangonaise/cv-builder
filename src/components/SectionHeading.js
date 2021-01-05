import React from 'react';

const SectionHeading = (props) => {
  return (
    <div className="section-heading">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>{props.title}</h2>
        <button className="add-button" onClick={props.onAdd}>Add</button>
      </div>
      
      <div className="horizontal-break"></div>
    </div>
  )
}

export default SectionHeading;