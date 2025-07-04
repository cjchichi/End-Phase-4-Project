/*
import React from 'react';
import EditGroupForm from '../components/EditGroupForm';

export default function EditGroupPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <EditGroupForm />
      </div>
    </div>
  );
}
*
//boostrap
import React from 'react';
import EditGroupForm from '../components/EditGroupForm';

export default function EditGroupPage() {
  return (
    <div className="container mt-5">
      <div className="card shadow border-0">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center text-primary">Edit Study Group</h2>
          <EditGroupForm />
        </div>
      </div>
    </div>
  );
}
*/

import React from 'react';
import EditGroupForm from '../components//EditGroupForm';

export default function EditGroupPage() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Edit Group</h2>
        <EditGroupForm />
      </div>
    </div>
  );
}
