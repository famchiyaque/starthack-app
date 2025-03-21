
import React from 'react';
import NewProjectForm from '@/components/projects/NewProjectForm';

const NewProject = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create New Project</h1>
      <NewProjectForm />
    </div>
  );
};

export default NewProject;
