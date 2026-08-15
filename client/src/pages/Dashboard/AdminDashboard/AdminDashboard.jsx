import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FiUsers, FiShield, FiBarChart2, FiDollarSign } from 'react-icons/fi';
import { IoMale, IoFemale } from 'react-icons/io5';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    }
  });

  const mockStats = {
    totalBiodata: 1250,
    maleBiodata: 650,
    femaleBiodata: 600,
    premiumBiodata: 120,
    totalRevenue: 575,
  };
  const displayStats = stats.totalBiodata ? stats : mockStats;

  const COLORS = ['#E8366D', '#6C63FF', '#FFB800', '#00D2FF'];

  const pieData = [
    { name: 'Total Biodata', value: displayStats.totalBiodata },
    { name: 'Male', value: displayStats.maleBiodata },
    { name: 'Female', value: displayStats.femaleBiodata },
    { name: 'Premium', value: displayStats.premiumBiodata },
  ];

  const statCards = [
    { label: 'Total Biodata', value: displayStats.totalBiodata, icon: <FiUsers />, color: '#E8366D' },
    { label: 'Male Biodata', value: displayStats.maleBiodata, icon: <IoMale />, color: '#6C63FF' },
    { label: 'Female Biodata', value: displayStats.femaleBiodata, icon: <IoFemale />, color: '#FFB800' },
    { label: 'Premium Biodata', value: displayStats.premiumBiodata, icon: <FiShield />, color: '#00D2FF' },
    { label: 'Total Revenue', value: `$${displayStats.totalRevenue}`, icon: <FiDollarSign />, color: '#00C853' },
  ];

  if (isLoading) return <div className="loading-container"><div className="loading-spinner"><div className="spinner-ring"></div></div></div>;

  return (
    <div>
      <div className="dashboard-title"><FiBarChart2 className="title-icon" /> Admin Dashboard</div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statCards.map((card, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ color: card.color }}>{card.icon}</div>
            <div className="stat-value">{card.value}</div>
            <div className="stat-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div className="chart-container">
        <h3>Platform Overview</h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#12121F',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                color: '#F0F0F5',
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ color: '#A0A0B8' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Card */}
      <div style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(0,200,83,0.1) 0%, rgba(100,221,23,0.05) 100%)',
        border: '1px solid rgba(0,200,83,0.2)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{ fontSize: '2.5rem', color: '#00C853' }}><FiDollarSign /></div>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Revenue</div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: '#00C853' }}>${displayStats.totalRevenue}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>From {displayStats.premiumBiodata} contact info purchases</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
