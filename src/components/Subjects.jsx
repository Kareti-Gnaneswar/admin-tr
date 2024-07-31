import React, { useState } from 'react';
import axios from 'axios';

const SubjectForm = () => {
    const [subjectName, setSubjectName] = useState('');
    const [subjectIcon, setSubjectIcon] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('subjectName', subjectName);
        formData.append('subjectIcon', subjectIcon);

        try {
            await axios.post('http://localhost:8080/api/subjects/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Subject added successfully!');
            // Optionally, reset the form fields after successful submission
            setSubjectName('');
            setSubjectIcon(null);
        } catch (error) {
            console.error('Error adding subject:', error);
            alert('An error occurred while adding the subject.');
        }
    };

    return (
        <div>
            <h2>Add New Subject</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="subjectName">Subject Name:</label>
                    <input
                        type="text"
                        id="subjectName"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="subjectIcon">Subject Icon:</label>
                    <input
                        type="file"
                        id="subjectIcon"
                        accept="image/*"
                        onChange={(e) => setSubjectIcon(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Add Subject</button>
            </form>
        </div>
    );
};

export default SubjectForm;
