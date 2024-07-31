import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MCQComponent.css'; // Import CSS file

const MCQComponent = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctChoice, setCorrectChoice] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState(null); // Define the error state variable

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get("http://localhost:8080/api/subjects/getsubjects"); // Change this to your backend endpoint
        const subjectNames = response.data.map(subject => subject.subjectName);
        setSubjects(subjectNames);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Error fetching options. Please try again later.");
      }
    }

    fetchOptions();
  }, []);


  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (e, index) => {
    const newChoices = [...choices];
    newChoices[index] = e.target.value;
    setChoices(newChoices);
  };

  const handleCorrectChoiceChange = (e) => {
    setCorrectChoice(Number(e.target.value));
  };

  const handleExplanationChange = (e) => {
    setExplanation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMCQ = {
      subject: selectedSubject,
      question,
      choices,
      correctChoice,
      explanation
    };
    submitMCQToServer(newMCQ);
  };

  const submitMCQToServer = (mcq) => {
    fetch('http://localhost:8080/api/admin/mcq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mcq)
    })
    .then(response => {
      if (response.ok) {
        console.log('MCQ submitted successfully');

        setSelectedSubject('');
        setQuestion('');
        setChoices(['', '', '', '']);
        setCorrectChoice(null);
        setExplanation('');
      } else {
        console.error('Failed to submit MCQ');
      }
    })
    .catch(error => console.error('Error submitting MCQ:', error));
  };

  return (
    <div className="mcq-container"> {/* Apply styling to this container */}
      <form onSubmit={handleSubmit}>
        <select value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">Choose subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <textarea value={question} onChange={handleQuestionChange} placeholder="Enter your question" />
        {choices.map((choice, index) => (
          <input key={index} type="text" value={choice} onChange={(e) => handleChoiceChange(e, index)} placeholder={`Option ${index + 1}`} />
        ))}
        <div>
          <label>
            Correct Choice:
            <select value={correctChoice === null ? '' : correctChoice} onChange={handleCorrectChoiceChange}>
              <option value="">Select</option>
              {choices.map((choice, index) => (
                <option key={index} value={index}>
                  {`Option ${index + 1}`}
                </option>
              ))}
            </select>
          </label>
        </div>
        <textarea value={explanation} onChange={handleExplanationChange} placeholder="Add explanation for correct answer" />
        <button type="submit">Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if error occurs */}
      </form>
    </div>
  );
};

export default MCQComponent;
