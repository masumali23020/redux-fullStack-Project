import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetsProjectsQuery } from '../../features/projects/projectsApi';
import { useGetTaskQuery } from '../../features/task/taskApi';
import { useGetsTeamsQuery } from '../../features/team/teamApi';
import EditFrom from '../EditFrom';

export default function EditeTask() {
  const {taskId}= useParams();

  const {data:projects} = useGetsProjectsQuery();
  const {data: tasks, isLoading, isError} = useGetTaskQuery(taskId);
  const {data: team} = useGetsTeamsQuery();
 
  let content = null;
  if(isLoading) {
    content = <h3>loading...</h3>
  }
if(!isLoading && isError)content= <h3>faild to the task!</h3>
if(!isLoading && !isError && !tasks.id ) content = <h3>No Project Found!!</h3>;
if(!isLoading && !isError && tasks.id ){
  content =   <EditFrom teams={team} projects={projects} task={tasks} />
}
  return (
    <div className="container relative">
    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
        Edit Task for Your Team
      </h1>

      <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
  {content}

      </div>



      </main>
      </div>
  )
}
