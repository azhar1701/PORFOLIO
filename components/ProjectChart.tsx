
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

interface ProjectChartProps {
  data: { name: string; value: number; unit?: string }[];
  title: string;
  unit: string;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg p-3 shadow-lg">
        <p className="label text-sm font-bold text-white">{`${label}`}</p>
        <p className="intro text-cyan-400">{`${payload[0].value.toLocaleString()} ${payload[0].payload.unit || ''}`}</p>
      </div>
    );
  }
  return null;
};

const ProjectChart: React.FC<ProjectChartProps> = ({ data, title, unit }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 border border-slate-700 rounded-lg p-4">
      <h4 className="text-lg font-bold text-white mb-4 text-center">{title}</h4>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px' }} formatter={() => <span className="text-slate-300">{unit}</span>}/>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00B4D8"
              strokeWidth={2}
              dot={{ r: 4, fill: '#00B4D8' }}
              activeDot={{ r: 8, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectChart;
