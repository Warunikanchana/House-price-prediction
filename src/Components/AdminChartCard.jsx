import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import '../Components-css/AdminDashboard.css';

function AdminChartCard({
  title,
  subtitle,
  rows,
  valueKey,
  labelRenderer,
  emptyMessage,
  chartType = 'bar',
}) {
  const chartData = rows.map((row) => ({
    label: labelRenderer(row),
    value: Number(row[valueKey]) || 0,
  }));

  return (
    <article className="admin-chart-card">
      <div className="admin-chart-head">
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      {chartData.length === 0 ? (
        <p className="admin-chart-empty">{emptyMessage}</p>
      ) : (
        <div className="admin-chart-canvas">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData} margin={{ top: 10, right: 12, left: -18, bottom: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  height={56}
                />
                <YAxis allowDecimals={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 14,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.12)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0f766e"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#14b8a6' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 12, left: -18, bottom: 6 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  interval={0}
                  angle={-18}
                  textAnchor="end"
                  height={56}
                />
                <YAxis allowDecimals={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 14,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 14px 30px rgba(15, 23, 42, 0.12)',
                  }}
                />
                <Bar dataKey="value" fill="#14b8a6" radius={[10, 10, 0, 0]} maxBarSize={42} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}

export default AdminChartCard;
