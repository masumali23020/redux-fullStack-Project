import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { projectApi, useGetsProjectsQuery } from '../features/projects/projectsApi';
import { useAddTaskMutation } from '../features/task/taskApi';
import { temApi, useGetsTeamsQuery } from '../features/team/teamApi';

export default function From() {

   const { data: projects } = useGetsProjectsQuery();
   const { data: team } = useGetsTeamsQuery();
   const [addTask, { isLoading, isSuccess, isError }] = useAddTaskMutation();


   const [taskName, setTaskName] = useState('');
   const [assignedTo, setAssignedTo] = useState('');
   const [projectName, setProjectName] = useState('');
   const [deadline, setDeadline] = useState('');
   const [selectedProjectInfo, setSelectedProjectInfo] = useState(undefined);
   const [selectedMemberInfo, setSelectedMemberInfo] = useState(undefined);

   const dispatch = useDispatch();

   // integration of react-router-dom hooks here
   const navigate = useNavigate();

   // getting selected project for the new task here
   useEffect(() => {
       if (projectName) {
           dispatch(projectApi.endpoints.getProject.initiate(projectName))
               .unwrap()
               .then(data => setSelectedProjectInfo(data))
               .catch();
       }
   }, [projectName, dispatch]);

   // getting selected team member for the new task here
   useEffect(() => {
       if (assignedTo) {
           dispatch(temApi.endpoints.getTeamMember.initiate(assignedTo))
               .unwrap()
               .then(data => setSelectedMemberInfo(data))
               .catch();
       }
   }, [assignedTo, dispatch]);

   // showing notification to the user based on success or error here
   useEffect(() => {
       if (isSuccess) {
           toast.success('New Task Added Successfully!!!');
           navigate('/');
       }

       if (isError) {
           toast.error('Failed To Add New Task!!!');
       }
   }, [isSuccess, isError, navigate]);


   // handler function to handle add new task form submission
   const addFormSubmissionHandler = e => {
       e.preventDefault();

       addTask({
           taskName,
           teamMember: selectedMemberInfo[0],
           project: selectedProjectInfo[0],
           deadline,
           status: 'pending',
       });
   }

   // rendering add new task form component here
   return (
       <>
           <h1 className='mt-4 mb-8 text-3xl font-bold text-center text-gray-800'>
               Create Task for Your Team
           </h1>

           <div className='justify-center mb-10 space-y-2 md:flex md:space-y-0'>
               <form className='space-y-6' onSubmit={addFormSubmissionHandler}>
                   <div className='fieldContainer'>
                       <label htmlFor='lws-taskName'>Task Name</label>
                       <input
                           type='text'
                           name='taskName'
                           id='lws-taskName'
                           required
                           placeholder='Implement RTK Query'
                           value={taskName}
                           onChange={e => setTaskName(e.target.value)}
                       />
                   </div>

                   <div className='fieldContainer'>
                       <label>Assign To</label>
                       <select name='teamMember' id='lws-teamMember' required value={assignedTo}
                           onChange={e => setAssignedTo(e.target.value)}>
                           <option value='' hidden>Select Job</option>
                           {
                               team?.map(member => <option
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
                       <select id='lws-projectName' name='projectName' required value={projectName}
                           onChange={e => setProjectName(e.target.value)}>
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
                       <input type='date' name='deadline' id='lws-deadline' min={new Date().toISOString().split('T')[0]} required value={deadline}
                           onChange={e => setDeadline(e.target.value)} />
                   </div>

                   <div className='text-right'>
                       <button type='submit' className='lws-submit' disabled={isLoading}>Save</button>
                   </div>
               </form>
           </div>
       </>
   );
};