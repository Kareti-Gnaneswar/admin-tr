import React, { useState } from 'react';
import './App.css';
import HRQuestions from './hrQuestions';
import MCQComponent from './MCQs';
import NotificationContent from './NotificationContent';
import SubjectForm from './Subjects';
import TRquestions from './TRquestions';
function App() {
  const [selectedButton, setSelectedButton] = useState(null);
  
  const options = [
    "Send a Notification",
    "Create Subject",
    "TR questions",
    "HR questions",
    "MCQs",
    "Mock Interview Requests",
    "Mentoring Requests",
    "Logout"
  ];

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
  };

  const renderContent = () => {
    switch (selectedButton) {
      case 'Send a Notification':
        return <NotificationContent/>;
      case 'Create Subject':
        return <SubjectForm/>;
      case 'TR questions':
        return <TRquestions/>;
      case 'HR questions':
        return <HRQuestions />;
      case 'MCQs':
        return <MCQComponent/>;
      case 'Mock Interview Requests':
        return <div>Mock Interview Requests</div>;
      case 'Mentoring Requests':
        return <div>Mentoring Requests</div>;
      case 'Logout':
        return <div>Logout content</div>;
      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className="container">
      <div className="side">
        <ul>
          {options.map(option => (
            <button key={option} onClick={() => handleButtonClick(option)}>
              <li>{option}</li>
            </button>
          ))}
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
