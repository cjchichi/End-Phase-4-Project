import React, { useState } from 'react';

const GroupForm = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [meetingTime, setMeetingTime] = useState(initialData?.meeting_time || '');
  const [maxMembers, setMaxMembers] = useState(initialData?.max_members || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, location, meeting_time: meetingTime, max_members: maxMembers });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-3">
        <label className="form-label">Group Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Meeting Time</label>
        <input
          type="datetime-local"
          className="form-control"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Max Members</label>
        <input
          type="number"
          className="form-control"
          value={maxMembers}
          onChange={(e) => setMaxMembers(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Submit</button>
    </form>
  );
};

export default GroupForm;
