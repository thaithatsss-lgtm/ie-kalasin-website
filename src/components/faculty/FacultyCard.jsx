import React from 'react';
import { Mail, Phone, MapPin, Award, Book, Briefcase } from 'lucide-react';

/**
 * FacultyCard Component - แสดงข้อมูลบุคลากรแบบ Card
 * @param {Object} faculty - ข้อมูลบุคลากร
 * @param {Function} onSelect - ฟังก์ชันเมื่อคลิกดูโปรไฟล์
 */
const FacultyCard = ({ faculty, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header with Photo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div className="flex items-center gap-6">
          {/* Profile Photo */}
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg flex-shrink-0 p-1">
            {faculty.photo ? (
              <img
                src={faculty.photo}
                alt={faculty.name.th}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-4xl font-bold">
                {faculty.name.th?.charAt(faculty.name.th.indexOf(' ') + 1)}
              </div>
            )}
          </div>

          {/* Name and Position */}
          <div className="text-white flex-1">
            <h3 className="text-xl font-bold mb-2">{faculty.name.th}</h3>
            <p className="text-blue-100 text-sm mb-1">{faculty.name.en}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                {faculty.academicPosition}
              </span>
              {faculty.administrativePosition && (
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {faculty.administrativePosition}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Education */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Book className="w-5 h-5 text-blue-600" />
            การศึกษา
          </h4>
          <div className="space-y-2">
            {faculty.education.map((edu, idx) => (
              <div key={idx} className="pl-7 border-l-2 border-blue-200">
                <p className="font-medium text-gray-700">
                  {edu.degree} - {edu.field}
                </p>
                <p className="text-sm text-gray-600">
                  {edu.institution} ({edu.year})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            ความเชี่ยวชาญ
          </h4>
          <div className="flex flex-wrap gap-2">
            {faculty.expertise.slice(0, 4).map((exp, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {exp.split('(')[0].trim()}
              </span>
            ))}
            {faculty.expertise.length > 4 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                +{faculty.expertise.length - 4} เพิ่มเติม
              </span>
            )}
          </div>
        </div>

        {/* Research */}
        {faculty.research.totalPublications > 0 && (
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              งานวิจัย
            </h4>
            <p className="text-sm text-gray-600">
              ผลงานตีพิมพ์: <span className="font-semibold">{faculty.research.totalPublications}</span> ผลงาน
            </p>
            {faculty.research.interests && (
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">ความสนใจ:</span> {faculty.research.interests}
              </p>
            )}
          </div>
        )}

        {/* Contact Information */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-800 mb-3">ติดต่อ</h4>
          <div className="space-y-2">
            {faculty.contact.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-blue-600" />
                <a href={`mailto:${faculty.contact.email}`} className="hover:text-blue-600">
                  {faculty.contact.email}
                </a>
              </div>
            )}
            {(faculty.contact.officePhone || faculty.contact.mobile) && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{faculty.contact.officePhone || faculty.contact.mobile}</span>
              </div>
            )}
            {faculty.contact.office && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{faculty.contact.office}</span>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        {(faculty.socialLinks.googleScholar || faculty.socialLinks.researchGate || faculty.socialLinks.linkedin) && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex gap-3">
              {faculty.socialLinks.googleScholar && (
                <a
                  href={faculty.socialLinks.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Google Scholar
                </a>
              )}
              {faculty.socialLinks.researchGate && (
                <a
                  href={faculty.socialLinks.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  ResearchGate
                </a>
              )}
              {faculty.socialLinks.linkedin && (
                <a
                  href={faculty.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        )}

        {/* View Profile Button */}
        <button
          onClick={() => onSelect && onSelect(faculty)}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          ดูโปรไฟล์เต็ม
        </button>
      </div>
    </div>
  );
};

export default FacultyCard;
