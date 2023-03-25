import React from 'react';
import { useGetsProjectsQuery } from "../features/projects/projectsApi";
import Project from './Project';

export default function ProjectList() {
  const {data:projects, isLoading, isError, error} = useGetsProjectsQuery();



  // decide what to render 
  let content = null;
  if(isLoading) content = <p>loading</p>;
  if(!isLoading && isError)content = <p> {error}</p>
  if(!isLoading && !isError && projects.length === 0)content = <p>No project found !</p>
  if(!isLoading && !isError && projects.length > 0){
    content = projects.map(project => <Project key={project.id}  project={project} /> )
  }
  return (
    <div>
        <h3 className="text-xl font-bold">Projects</h3>
        <div className="mt-3 space-y-4">
          {content}
          

          
        </div>
      </div>
  )
}
