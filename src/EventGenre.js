import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const getData = (events) => {
  console.log({ events })
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
  const data = genres.map((genre) => {
    const value = events.filter(({ summary }) => summary.split(' ').includes(genre)).length;
    return { name: genre, value };
  });
  console.log({ data })
  return data;
};

const COLORS = ['#f2a2a2', '#f28444', '#b4a7d6', '#5b9cd4', '#00C49F'];

const renderCustomizedLabel = ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`;

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventsData = getData(events);
    setData(eventsData);
  }, [events]);

  console.log(data)
  return (
    <div className='piechart'>
      <p>Types of Events:</p>

      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default EventGenre;
