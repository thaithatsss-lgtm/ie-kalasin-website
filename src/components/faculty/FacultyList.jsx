import React, { useState } from 'react';
import FacultyCard from './FacultyCard';
import facultyData from '../../data/faculty_data.json';
import { Search, Filter } from 'lucide-react';

/**
 * FacultyList Component - แสดงรายชื่อบุคลากรทั้งหมดพร้อมฟังก์ชันค้นหาและกรอง
 */
const FacultyList = ({ onSelectFaculty }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPosition, setFilterPosition] = useState('all');

  // ฟังก์ชันกรองข้อมูล
  const filteredFaculty = facultyData.filter(faculty => {
    // กรองตามคำค้นหา
    const matchSearch =
      faculty.name.th?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.name.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));

    // กรองตามตำแหน่ง
    const matchPosition =
      filterPosition === 'all' ||
      faculty.academicPosition === filterPosition;

    return matchSearch && matchPosition;
  });

  // ดึงตำแหน่งทางวิชาการที่ไม่ซ้ำกัน
  const uniquePositions = [...new Set(facultyData.map(f => f.academicPosition))];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">บุคลากร</h1>
          <h2 className="text-xl text-blue-100">สาขาวิชาวิศวกรรมอุตสาหการ</h2>
          <p className="text-blue-100 mt-2">คณะวิศวกรรมศาสตร์ มหาวิทยาลัยกาฬสินธุ์</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Box */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาจากชื่อหรือความเชี่ยวชาญ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            {/* Filter by Position */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer min-w-[200px] text-gray-900"
              >
                <option value="all">ตำแหน่งทั้งหมด</option>
                {uniquePositions.map(position => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            แสดง <span className="font-semibold">{filteredFaculty.length}</span> จาก {facultyData.length} คน
          </div>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map(faculty => (
              <FacultyCard
                key={faculty.id}
                faculty={faculty}
                onSelect={onSelectFaculty}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              ไม่พบข้อมูลบุคลากร
            </h3>
            <p className="text-gray-500">
              ลองค้นหาด้วยคำอื่นหรือเปลี่ยนตัวกรอง
            </p>
          </div>
        )}
      </div>

      {/* Statistics Section */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            สถิติบุคลากร
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {facultyData.length}
              </div>
              <div className="text-gray-600">บุคลากรทั้งหมด</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {facultyData.filter(f => f.highestDegree === 'ปริญญาเอก').length}
              </div>
              <div className="text-gray-600">ปริญญาเอก</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {facultyData.reduce((sum, f) => sum + (f.research.totalPublications || 0), 0)}
              </div>
              <div className="text-gray-600">ผลงานวิจัย</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {uniquePositions.length}
              </div>
              <div className="text-gray-600">ตำแหน่งวิชาการ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyList;
