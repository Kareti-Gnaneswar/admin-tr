import React, { useState } from 'react';
import axios from 'axios';
// Import the CSS file

function NotificationContent() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError("Both fields must be filled out");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/notifications/send", {
                title: title,
                content: content
            });
            console.log(response.data); // Assuming the response contains success message
            setSuccessMessage('Notification sent successfully');
            setTitle('');
            setContent('');
            setError('');
        } catch (error) {
            console.error('Error sending notification:', error);
            setError('Failed to send notification. Please try again later.');
        }
    };

    return (
        <div className="center"> {/* Add the CSS class here */}
            <h1>Create Notification</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex-column">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                {error && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NotificationContent;