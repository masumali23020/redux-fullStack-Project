import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { projectApi } from '../features/projects/projectsApi';
import { useEditTaskMutation } from '../features/task/taskApi';
import { temApi } from '../features/team/teamApi';

export default function EditFrom({teams,projects,task}) {
// destructuring the task object here
const { id, taskName, teamMember, project, deadline } = task || {};

// integration of RTK query hooks here
const [editTask, { isLoading, isError, isSuccess }] = useEditTaskMutation();

// integration of react hooks here
const [editTaskName, setEditTaskName] = useState(taskName);
const [editAssignedTo, seteditAssignedTo] = useState(teamMember?.name);
const [editProjectName, seteditProjectName] = useState(project?.projectName);
const [editDeadline, seteditDeadline] = useState(deadline);
const [selectedProject, setSelectedProject] = useState(undefined);
const [selectedMember, setSelectedMember] = useState(undefined);

// integration of react-redux hooks here
const dispatch = useDispatch();

// integration of react-router-dom hooks here
const navigate = useNavigate();

// getting selected project for the new task here
useEffect(() => {
    if (editProjectName) {
        dispatch(projectApi.endpoints.getProject.initiate(editProjectName))
            .unwrap()
            .then(data => setSelectedProject(data))
            .catch();
    }
}, [editProjectName, dispatch]);

// getting selected team member for the new task here
useEffect(() => {
    if (editAssignedTo) {
        dispatch(temApi.endpoints.getTeamMember.initiate(editAssignedTo))
            .unwrap()
            .then(data => setSelectedMember(data))
            .catch();
    }
}, [editAssignedTo, dispatch]);

// showing notification to the user based on success or error here
useEffect(() => {
    if (isSuccess) {
        toast.success('Task Modified Successfully!!!');
        navigate('/');
    }

    if (isError) {
        toast.error('Failed To Edit Existing Task!!!');
    }
}, [isSuccess, isError, navigate]);

// handler function to handle edit task form submission
const editFormSubmissionHandler = e => {
    e.preventDefault();

    editTask({
      taskId: id,
     
        data: {
            taskName: editTaskName,
            teamMember: selectedMember[0],
            project: selectedProject[0],
            deadline: editDeadline,
        }
    });
}


// rendering the edit form here
return (
    <div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
        <form className='space-y-6' onSubmit={editFormSubmissionHandler}>
            <div className='fieldContainer'>
                <label htmlFor='lws-taskName'>Task Name</label>
                <input
                    type='text'
                    name='taskName'
                    id='lws-taskName'
                    required
                    placeholder='Implement RTK Query'
                    value={editTaskName}
                    onChange={e => setEditTaskName(e.target.value)}
                />
            </div>

            <div className='fieldContainer'>
                <label>Assign To</label>
                <select name='teamMember' id='lws-teamMember' required value={editAssignedTo}
                    onChange={e => seteditAssignedTo(e.target.value)}>
                    <option value='' hidden>Select Job</option>
                    {
                        teams?.map(member => <option
                            key={member.id}
                        >
                            {member.name}
                        </option>
                        )
                    }
                </select>
            </div>
            <div className='fieldContainer'>
                <label htmlFor='lws-projectName'>Project Name</label>
                <select id='lws-projectName' name='projectName' required value={editProjectName}
                    onChange={e => seteditProjectName(e.target.value)}>
                    <option value='' hidden>Select Project</option>
                    {
                        projects?.map(project => <option
                            key={project.id}
                        >
                            {project.projectName}
                        </option>
                        )
                    }
                </select>
            </div>

            <div className='fieldContainer'>
                <label htmlFor='lws-deadline'>Deadline</label>
                <input type='date' name='deadline' id='lws-deadline' required value={editDeadline}
                    onChange={e => seteditDeadline(e.target.value)} />
            </div>

            <div className='text-right'>
                <button type='submit' className='lws-submit' disabled={isLoading}>Save</button>
            </div>
        </form>
    </div>
);
};