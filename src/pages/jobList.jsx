import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../app/jobSlice';

const JobList = () => {
  const state = useSelector((state) => state.jobSlice);
  console.log(state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:3060/jobs')
      .then((res) => dispatch(setJobs(res.data)));
  }, []);

  return (
    <>
      <h3 className="job-count"> {state.jobs.length} İş BUlundu</h3>
      <section className="list-section">
        {!state.initialized ? (
          <p>Loading....</p>
        ) : (
          state.jobs.map((job) => (
            <div key={job.id} className="job-card">
              {/* kartın üst kısmı */}
              <div className="head">
                <div className="letter">
                  <p>{job.company[0]}</p>
                </div>
                <div className="info">
                  <p>{job.position}</p>
                  <p>{job.company}</p>
                </div>
              </div>
              {/* kartın alt kısmı */}
              <div className="body">
                <div className="field">
                  <img src="/images/map.png" />
                  <p>{job.location}</p>
                </div>
                <div className="field">
                  <img src="/images/calendar.png" />
                  <p>{job.date}</p>
                </div>
                <div className="field">
                  <img src="/images/bag.png" />
                  <p>{job.type}</p>
                </div>

                <div className="status">
                  <p className={job.status}>{job.status}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default JobList;

//  {!state.initialized && <p>Loading....</p>}
// {state.initialized && state.jobs.map()}
