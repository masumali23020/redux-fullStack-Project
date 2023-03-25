import React from 'react';
import { useSelector } from "react-redux";
import { useGetsTasksQuery } from '../features/task/taskApi';
import Task from './Task';

export default function TaskList() {
  const { data: taskList, isLoading, isError } = useGetsTasksQuery();

  // integration of react-redux hooks here
  const { filterBy, searchBy } = useSelector(state => state.filters);

  // filtering the tasks based on selected projects here
  const filterTasksByProjects = task => {
      return filterBy.indexOf(task.project.projectName) > -1;
  }

  // searching tasks based on their title here
  const searchTasksByTaskName = task => {
      return task.taskName.toLowerCase().includes(searchBy.toLowerCase());
  }

  // deciding what to render here
  let content = null;

  if (isLoading) {
      content = <h1>Loading...</h1>;
  }

  if (!isLoading && isError) {
      content = <h3 className='text-center font-medium text-xl'>Failed To Load The Tasks!!</h3>;
  }

  if (!isLoading && !isError && !taskList.length) {
      content = <h3 className='text-center font-medium text-xl'>No Tasks Found!!</h3>;
  }

  if (!isLoading && !isError && taskList.length) {
      taskList.filter(searchTasksByTaskName).length ?
          taskList.filter(filterTasksByProjects).length ?
              content = taskList
                  .filter(filterTasksByProjects)
                  .filter(searchTasksByTaskName)
                  .map(task => <Task
                      key={task.id}
                      task={task}
                  />)
              :
              content = <h3 className='text-center font-medium text-xl'>No Tasks Found!!</h3>
          :
          content = <h3 className='text-center font-medium text-xl'>No Tasks Found!!</h3>
  }

  // rendering task list component here
  return (
      <div className='lws-task-list'>
          {content}
      </div>
  );
};

