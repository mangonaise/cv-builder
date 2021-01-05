import { useState, useEffect } from 'react';
import './App.css'
import './components/SectionHeading';
import SectionHeading from './components/SectionHeading';
import CvDetailedItem from './components/CvDetailedItem';
import CvSimpleItem from './components/CvSimpleItem';
import CvLink from './components/CvLink';
import uniqid from 'uniqid';

function App() {
  const [ userName, setUserName ] = useState('');
  const [ userPhoneNumber, setUserPhoneNumber ] = useState('');
  const [ userEmail, setUserEmail ] = useState('');
  const [ experienceList, setExperienceList ] = useState([]);
  const [ skillList, setSkillList ] = useState([]);
  const [ educationList, setEducationList ] = useState([]);
  const [ isPreviewing, setIsPreviewing ] = useState(false);
  const [ linkList, setLinkList ] = useState(
  [
    { id: uniqid(), text: 'LinkedIn', destination: ''},
    { id: uniqid(), text: 'GitHub', destination: ''}
  ]);

  function updateListItem(stateSetter, newData) {
    stateSetter(prevList => {
      let tempList = [...prevList];
      let index = tempList.indexOf(tempList.find(item => item.id === newData.id));
      if (index === -1) {
        tempList.push(newData);
      } else {
        tempList[index] = newData;
      }
      return tempList;
    })
  }

  function addListItem(stateSetter) {
    if (stateSetter === setLinkList) {
      stateSetter(prevList => [...prevList, {
        id: uniqid(),
        text: '',
        destination: ''
      }])
    } else {
      stateSetter(prevList => [...prevList, {
        id: uniqid(),
        title: '',
        yearStart: '',
        yearEnd: '',
        description: ''
      }]);
    }
  }

  function deleteListItem(stateSetter, deletingId) {
    stateSetter(prevList => {
      let tempList = [...prevList];
      let index = tempList.indexOf(tempList.find(item => item.id === deletingId));
      tempList.splice(index, 1);
      return tempList;
    })
  }

  function togglePreview() {
    setIsPreviewing(prevState => !prevState)
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--button-display', isPreviewing ? 'none' : 'inline');
    document.documentElement.style.setProperty('--background-color', isPreviewing ? 'rgb(120, 120, 120)' : 'rgb(245, 245, 245)');
  }, [isPreviewing])

  return (
    <div>
      <div id="preview-button-container">
        <button id="preview-button" onClick={togglePreview}>
          {`${isPreviewing ? 'Disable' : 'Enable'} preview mode`}
        </button>
      </div>

      <div className="document flex-column">
        {/* Main info and links */}
        <div className="flex-space-between"> 
          <div style={{pointerEvents: isPreviewing ? 'none' : 'auto'}}>
            <CvSimpleItem 
            titlePlaceholder="Name"
            titleFallback="Your name here"
            title={userName} 
            onEdit={newData => setUserName(newData)}
            />
            <CvSimpleItem 
              titlePlaceholder="Phone number"
              titleFallback="Phone number"
              small={true}
              title={userPhoneNumber} 
              onEdit={newData => setUserPhoneNumber(newData)}
            />
            <CvSimpleItem 
              titlePlaceholder="Email"
              titleFallback="Email"
              small={true}
              title={userEmail} 
              onEdit={newData => setUserEmail(newData)}
            />
          </div>
          <div style={{ textAlign: 'right'}}>
            <button className="add-link-button" onClick={() => addListItem(setLinkList)}>Add link</button>
            {linkList.map(itemData =>
              <CvLink 
                key={itemData.id}
                id={itemData.id}
                text={itemData.text}
                textFallback='Empty link'
                destination={itemData.destination}
                onEdit={newData => updateListItem(setLinkList, newData)}
                onDelete={() => deleteListItem(setLinkList, itemData.id)}
              />
            ) }
          </div>
        </div>
        <br/>
        {/* Experience, skills and education */}
        <div className="flex-column" style={{width: '100%', pointerEvents: isPreviewing ? 'none' : 'auto'}}>
          <SectionHeading title="Experience" onAdd={() => addListItem(setExperienceList)}/>
          { experienceList.map(itemData => 
            <CvDetailedItem 
              key={itemData.id}
              titleFallback="Empty experience (click to edit)" 
              data={itemData} 
              onEdit={newData => updateListItem(setExperienceList, newData)}
              onDelete={() => deleteListItem(setExperienceList, itemData.id)}
            />
          ) }
          <SectionHeading title="Skills" onAdd={() => addListItem(setSkillList)}/>
          { skillList.map(itemData => 
            <CvDetailedItem 
              key={itemData.id} 
              titleFallback="Empty skill (click to edit)"
              noDates={true} 
              data={itemData} 
              onEdit={newData => updateListItem(setSkillList, newData)}
              onDelete={() => deleteListItem(setSkillList, itemData.id)}
            />
          ) }
          <SectionHeading title="Education" onAdd={() => addListItem(setEducationList) }/>
          { educationList.map(itemData => 
            <CvDetailedItem 
              key={itemData.id} 
              titleFallback="Empty education (click to edit)"
              data={itemData} 
              onEdit={newData => updateListItem(setEducationList, newData)}
              onDelete={() => deleteListItem(setEducationList, itemData.id)}
            />
          ) }
        </div>        
      </div>
    </div>
  );
}

export default App;
