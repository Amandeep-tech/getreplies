import { UserOutlined, PhoneOutlined } from '@ant-design/icons';

const menuItems = [
//   
  { label: 'Call', icon: <PhoneOutlined /> },
  {label: 'Prospects', icon: <UserOutlined />},
];

export default function Sidebar() {
  return (
    <aside className="w-56  pt-0 pb-4 bg-white h-screen border-r flex flex-col">
      <div className="px-8 py-4 font-bold text-xl flex items-center gap-2 border-b-2 border-gray-200">
        <div className="text-white rounded  flex items-center ">
            <span className='bg-black text-white px-2'>G</span>
            <span className='bg-white text-black'>Replies</span>
        </div>
      </div>
      <nav className="flex-1 mt-2">
        {menuItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-black hover:text-blue-500 hover:bg-gray-100 px-6 py-3 cursor-pointer">
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
     
    </aside>
  );
}