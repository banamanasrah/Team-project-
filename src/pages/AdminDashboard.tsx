import React, { useState } from 'react';
import { 
  LayoutDashboard, BarChart3, ShoppingBag, Users, 
  Star, MessageSquare, Wallet, LogOut, Plus, Edit2, Trash2, User,
  Bell, Search, Settings, Package, Briefcase, DollarSign,
  SquarePen, MoreVertical, Phone, Video
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

// --- Mock Data ---
const customerMapData = [
  { day: 'Sun', thisWeek: 800, lastWeek: 600 },
  { day: 'Mon', thisWeek: 450, lastWeek: 420 },
  { day: 'Tue', thisWeek: 750, lastWeek: 400 },
  { day: 'Wed', thisWeek: 350, lastWeek: 450 },
  { day: 'Thu', thisWeek: 400, lastWeek: 480 },
  { day: 'Fri', thisWeek: 600, lastWeek: 500 },
  { day: 'Sat', thisWeek: 820, lastWeek: 650 },
];

const revenueData = [
  { name: 'Jan', primarySales: 20, feeCollection: 5 }, { name: 'Mar', primarySales: 25, feeCollection: 10 }, 
  { name: 'May', primarySales: 35, feeCollection: 15 }, { name: 'Jun', primarySales: 45, feeCollection: 20 },
  { name: 'Aug', primarySales: 28, feeCollection: 12 }, { name: 'Oct', primarySales: 38, feeCollection: 18 }, { name: 'Dec', primarySales: 55, feeCollection: 25 },
];

const navigationTabs = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Analytics', icon: BarChart3 },
  { name: 'Products', icon: ShoppingBag },
  { name: 'Providers', icon: Users },
  { name: 'Customer', icon: User },
  { name: 'Chats', icon: MessageSquare },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const activeTabItem = navigationTabs.find(tab => tab.name === activeTab) || navigationTabs[0];
  const ActiveIcon = activeTabItem.icon;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-black">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <span className="text-xl font-black tracking-tight text-black uppercase">ADMIN</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigationTabs.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.name ? 'bg-gray-200 text-black font-semibold' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-red-500 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3">
              <ActiveIcon className="text-black" size={24} />
              <h1 className="text-2xl font-bold text-black">{activeTab}</h1>
            </div>
            {activeTab === 'Products' && (
              <p className="text-gray-500 mt-2 ml-9">View and update your marketplace inventory catalog.</p>
            )}
          </div>
        </header>

        {activeTab === 'Providers' ? (
          <div>
            {/* Top Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <StatCard title="ACTIVE SERVICES" value="24" subValue="+3 this month" dark />
              <StatCard title="TOTAL BOOKINGS" value="842" subValue="↗ 12% increase" />
              <StatCard title="REVENUE (SEK)" value="12.4k" progress={65} />
              <StatCard title="CLIENT RATING" value="4.9" isRating />
            </div>

            {/* Services Section */}
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-xl font-bold">Your Services</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard 
                tag="Premium"
                image="https://via.placeholder.com/300x180/1e293b/ffffff?text=Service+1"
                title="Eco-Friendly Home Cleaning"
                price="850 SEK"
                desc="Complete house cleaning using only sustainable products..."
              />
              <ServiceCard 
                tag="Standard"
                image="https://via.placeholder.com/300x180/334155/ffffff?text=Service+2"
                title="Digital Workspace Setup"
                price="1200 SEK"
                desc="Ergonomic optimization and technical setup for high-perf..."
              />
              
              {/* Add New Service Placeholder Removed */}
            </div>
          </div>
        ) : activeTab === 'Products' ? (
          <ManageProductsInterface />
        ) : activeTab === 'Chats' ? (
          <InboxInterface 
            title={activeTab} 
            emptyTitle="Your chats inbox is empty"
            emptyDesc="You don't have any messages yet. Start a conversation with your customers to see them here."
            icon={ActiveIcon} 
          />
        ) : activeTab === 'Customer' ? (
          <div className="bg-gray-200 text-black rounded-3xl shadow-sm border border-gray-300 overflow-hidden">

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-300 text-black text-sm uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold border-b border-gray-400">Order ID</th>
                    <th className="px-6 py-4 font-semibold border-b border-gray-400">Customer Name</th>
                    <th className="px-6 py-4 font-semibold border-b border-gray-400">Location</th>
                    <th className="px-6 py-4 font-semibold border-b border-gray-400">Status</th>
                    <th className="px-6 py-4 font-semibold border-b border-gray-400">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <User size={48} className="mb-4 text-gray-500" />
                        <p className="text-xl font-bold text-black mb-2">No customer data available</p>
                        <p className="text-sm text-gray-600">There are currently no customer records associated with your account.</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab !== 'Dashboard' ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <ActiveIcon size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">
              {activeTab === 'Analytics' && 'No analytics data yet'}
            </h2>
            <p className="text-slate-500">
              {activeTab === 'Analytics' && "Data will appear here once your platform has activity."}
            </p>
          </div>
        ) : (
          <>
            {/* TOP STATS CARDS */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
            { label: 'Total Users', val: '0', color: 'bg-gray-200 text-black', icon: <Users size={18} /> },
            { label: 'Total Products', val: '0', color: 'bg-gray-200 text-black', icon: <Package size={18} /> },
            { label: 'Total Services', val: '0', color: 'bg-gray-200 text-black', icon: <Briefcase size={18} /> },
            { label: 'Platform Revenue', val: '$ 0', color: 'bg-gray-200 text-black', icon: <DollarSign size={18} /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-black">{stat.val}</h3>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              </div>
              <div className={`${stat.color} w-10 h-10 rounded-full flex items-center justify-center opacity-80`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS ROW 1 */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Order Summary */}
          <div className="col-span-7 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between mb-8">
              <h3 className="font-bold text-black">Order Summary</h3>
              <select className="text-xs bg-slate-100 px-2 py-1 rounded-md outline-none text-black">
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
            <div className="flex justify-around text-center">
              {[ {p:25, l:'On Delivery'}, {p:85, l:'Delivered'}, {p:7, l:'Cancelled'} ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="34" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                      <circle cx="40" cy="40" r="34" fill="transparent" stroke={i === 2 ? "#9ca3af" : "#4b5563"} strokeWidth="8" strokeDasharray="213" strokeDashoffset={213 - (213 * item.p) / 100} strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-sm font-bold text-black">{item.p}%</span>
                  </div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold">{item.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling */}
          <div className="col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <div className="flex justify-between mb-4">
                <h3 className="font-bold text-black">Top Selling Items</h3>
             </div>
             <div className="space-y-4">
                {[ {n:'Sofa', s:100}, {n:'T-shirt', s:150}, {n:'Caver', s:80} ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                      <span className="text-xs font-semibold text-black">{item.n}</span>
                    </div>
                    <span className="text-xs font-bold text-black">{item.s}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* CHARTS ROW 2 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-black mb-6">Customer Map</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerMapData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#000'}} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="thisWeek" fill="#4b5563" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="lastWeek" fill="#9ca3af" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-black mb-6">Revenue Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6b7280" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6b7280" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFee" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d1d5db" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#d1d5db" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area type="monotone" dataKey="primarySales" stroke="#6b7280" strokeWidth={3} fillOpacity={1} fill="url(#colorPrimary)" name="Primary Sales" />
                  <Area type="monotone" dataKey="feeCollection" stroke="#d1d5db" strokeWidth={3} fillOpacity={1} fill="url(#colorFee)" name="Fee Collection" />
                </AreaChart>
              </ResponsiveContainer>
              </div>
            </div>
          </div>
          </>
        )}
      </main>
    </div>
  );
};

// --- Sub-components ---

const StatCard = ({ title, value, subValue, progress, isRating, dark }: any) => (
  <div className="bg-gray-200 text-black p-6 rounded-3xl shadow-sm border border-gray-300">
    <p className="text-xs font-bold opacity-60 tracking-wider mb-2">{title}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-extrabold">{value}</span>
      {subValue && <span className="text-xs opacity-70">{subValue}</span>}
    </div>
    {progress && (
      <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4">
        <div className="bg-slate-800 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    )}
    {isRating && (
      <div className="flex text-yellow-400 mt-2">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
      </div>
    )}
  </div>
);

const ServiceCard = ({ tag, image, title, price, desc }: any) => (
  <div className="bg-gray-200 text-black rounded-3xl shadow-sm border border-gray-300 overflow-hidden">
    <div className="relative h-40">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
        {tag}
      </span>
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm w-2/3">{title}</h3>
        <span className="text-sm font-bold text-gray-400">{price}</span>
      </div>
      <p className="text-xs text-gray-500 mb-6 line-clamp-2">{desc}</p>
      <div className="flex gap-2 border-t pt-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100">
          <Edit2 size={14} /> Edit
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-500 bg-red-50 rounded-xl hover:bg-red-100">
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  </div>
);

export default AdminDashboard;

const InboxInterface = ({ title, emptyTitle, emptyDesc, icon: Icon }: any) => {
  return (
    <div className="flex bg-gray-200 text-black rounded-3xl shadow-sm border border-gray-300 overflow-hidden h-[600px]">
      
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-300 flex flex-col">
        <div className="p-5 border-b border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button className="p-2 hover:bg-gray-300 rounded-lg transition-colors">
              <SquarePen size={20} className="text-black" />
            </button>
          </div>
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-gray-300 text-black"
            />
          </div>
        </div>
        
        {/* Empty Sidebar List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center opacity-30 text-center">
           <Icon size={40} className="mb-2" />
           <p className="text-xs font-medium uppercase">No active {title.toLowerCase()}</p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {/* Header Placeholder */}
        <div className="h-16 bg-gray-200 border-b border-gray-300 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="flex gap-4 text-gray-400">
            <Phone size={18} />
            <Video size={18} />
            <MoreVertical size={18} />
          </div>
        </div>

        {/* Empty Inbox Message */}
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <div className="bg-gray-200 p-8 rounded-[40px] shadow-sm border border-gray-300 max-w-sm">
            <div className="w-16 h-16 bg-gray-300 text-black rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon size={32} />
            </div>
            <h3 className="text-xl font-bold text-black mb-2">{emptyTitle}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {emptyDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageProductsInterface = () => {
  const stats = [
    { label: 'TOTAL ITEMS', value: '0', color: 'text-black' },
    { label: 'LOW STOCK', value: '0', color: 'text-red-500' },
    { label: 'ACTIVE LISTINGS', value: '0', color: 'text-black' },
    { label: 'CATEGORIES', value: '4', color: 'text-black' },
  ];

  return (
    <div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-200 p-6 rounded-3xl shadow-sm border border-gray-300">
            <p className="text-xs font-bold text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-200 rounded-3xl shadow-sm border border-gray-300 overflow-hidden mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-300 text-black text-sm uppercase tracking-wider border-b border-gray-400">
              <th className="px-6 py-4 font-semibold">Product Name</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="px-6 py-20 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Package size={48} className="mb-4 text-gray-500" />
                  <p className="text-xl font-bold text-black mb-2">No products available</p>
                  <p className="text-sm text-gray-600">Your marketplace inventory is currently empty.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  );
};
