import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TRquestions() {
  const [selectedOption, setSelectedOption] = useState('');
  const [addQuestion, setAddQuestion] = useState('');
  const [addAnswer, setAddAnswer] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(true); // Show dropdown menu directly

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get("http://localhost:8080/api/subjects/getsubjects"); // Change this to your backend endpoint
        const subjectNames = response.data.map(subject => subject.subjectName);
        setOptions(subjectNames);
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Error fetching options. Please try again later.");
      }
    }

    fetchOptions();
  }, []);

  async function buttonClicked() {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:8080/trquestions/post", {
        option: selectedOption,
        question: addQuestion,
        answer: addAnswer
      });

      setSelectedOption('');
      setAddQuestion('');
      setAddAnswer('');
      // Optionally, provide feedback to the user that the submission was successful
    } catch (error) {
      console.error("Error posting data:", error);
      setError("Error submitting data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App" style={{ height: 500, width: "40%", marginLeft: '20%', justifyContent: 'center' }}>
      <header className="App-header">
        <h6>Select subject</h6>
        {/* Render dropdown options */}
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            borderColor: '#ccc'
          }}
          disabled={isLoading}
        >
          <option value="">--None--</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        <h6>Add question</h6>
        <textarea
          value={addQuestion}
          onChange={(e) => setAddQuestion(e.target.value)}
          placeholder="Enter Question"
          style={{ height: 'auto', width: '100%' }}
        />

        <h6>Add answer</h6>
        <textarea
          value={addAnswer}
          onChange={(e) => setAddAnswer(e.target.value)}
          placeholder="Enter Answer"
          style={{ height: 'auto', width: '100%' }}
        />

        <button
          className="myButton"
          style={{ display: 'block', marginLeft: "25%", marginTop: '20px' }}
          onClick={buttonClicked}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default TRquestions;
