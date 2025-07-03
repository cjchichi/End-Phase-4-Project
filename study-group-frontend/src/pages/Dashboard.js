/*
import React from 'react';

export default function Dashboard() {
  return (
    <div className = "dashboard">
      <h1>Welcome to the Study Group App</h1>
      <p>Discover, join, and create study groups tailored to your interests.
Collaborate with like-minded learners, stay organized, and take your academic journey to the next level — all in one elegant space.</p>
    </div>
  );
}
*/

import React from 'react';

export default function Dashboard() {
  return (
    <div className="dashboard px-6 py-10 max-w-3xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6 text-primary">Welcome to StudyHub</h1>
      <p className="text-lg mb-4">
        Join a vibrant learning community where collaboration drives success.
      </p>
      <p className="text-md text-gray-700 mb-4">
        Whether you're preparing for exams, mastering new skills, or simply exploring ideas — StudyHub connects you
        with people who share your academic goals. Create study groups, organize sessions, assign roles, and grow together.
      </p>
      <p className="text-md text-gray-700">
        Find your group. Share knowledge. Stay motivated. Make studying social.
      </p>
    </div>
  );
}
