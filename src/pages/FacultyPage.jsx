import { useState } from 'react';
import FacultyList from '../components/faculty/FacultyList';
import FacultyDetail from '../components/faculty/FacultyDetail';

/**
 * FacultyPage - หน้าแสดงข้อมูลบุคลากรทั้งหมด
 * จัดการสลับระหว่างหน้ารายชื่อ (List) และหน้าโปรไฟล์เต็ม (Detail)
 */
export default function FacultyPage() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  // ถ้ามีการเลือกบุคลากร แสดงหน้า Detail
  if (selectedFaculty) {
    return (
      <FacultyDetail 
        faculty={selectedFaculty} 
        onBack={() => setSelectedFaculty(null)} 
      />
    );
  }

  // ถ้ายังไม่ได้เลือก แสดงหน้า List
  return (
    <FacultyList onSelectFaculty={setSelectedFaculty} />
  );
}
