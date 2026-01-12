import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Award, Book, Briefcase, Heart, MessageSquare, ExternalLink } from 'lucide-react';

/**
 * FacultyDetail Component - แสดงข้อมูลบุคลากรแบบเต็ม
 * @param {Object} faculty - ข้อมูลบุคลากร
 * @param {Function} onBack - ฟังก์ชันสำหรับกลับหน้าก่อน
 */
const FacultyDetail = ({ faculty, onBack }) => {
  if (!faculty) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>กลับหน้ารายชื่อ</span>
          </button>
        </div>
      </div>

      {/* Header with Photo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Photo */}
            <div className="w-48 h-48 rounded-full overflow-hidden bg-white border-8 border-white shadow-2xl flex-shrink-0 p-1">
              {faculty.photo ? (
                <img
                  src={faculty.photo}
                  alt={faculty.name.th}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-6xl font-bold">
                  {faculty.name.th?.charAt(faculty.name.th.indexOf(' ') + 1)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-3">{faculty.name.th}</h1>
              <p className="text-xl text-blue-100 mb-4">{faculty.name.en}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {faculty.academicPosition}
                </span>
                {faculty.administrativePosition && (
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    {faculty.administrativePosition}
                  </span>
                )}
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {faculty.highestDegree}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">

            {/* Message to Students */}
            {faculty.messageToStudents && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  ข้อความถึงนิสิตและผู้สนใจเข้าศึกษา
                </h3>
                <p className="text-gray-700 italic leading-relaxed">"{faculty.messageToStudents}"</p>
              </div>
            )}

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-xl border-b pb-3">
                <Book className="w-6 h-6 text-blue-600" />
                การศึกษา
              </h3>
              <div className="space-y-4">
                {faculty.education.map((edu, idx) => (
                  <div key={idx} className="pl-4 border-l-4 border-blue-200">
                    <div className="font-semibold text-gray-800 text-lg mb-1">
                      {edu.degree === 'Ph.D.' && '🎓 ปริญญาเอก'}
                      {edu.degree === 'Master' && '🎓 ปริญญาโท'}
                      {edu.degree === 'Bachelor' && '🎓 ปริญญาตรี'}
                    </div>
                    <p className="font-medium text-gray-700">{edu.field}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {edu.institution} • {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-xl border-b pb-3">
                <Award className="w-6 h-6 text-blue-600" />
                ความเชี่ยวชาญ
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {faculty.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200"
                  >
                    {exp}
                  </span>
                ))}
              </div>
              {faculty.expertiseDetails && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">รายละเอียดเพิ่มเติม:</span> {faculty.expertiseDetails}
                  </p>
                </div>
              )}
            </div>

            {/* Teaching */}
            {faculty.teaching && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-xl border-b pb-3">
                  <Book className="w-6 h-6 text-blue-600" />
                  รายวิชาที่สอน
                </h3>
                <p className="text-gray-700 leading-relaxed">{faculty.teaching}</p>
              </div>
            )}

            {/* Research */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-xl border-b pb-3">
                <Briefcase className="w-6 h-6 text-blue-600" />
                งานวิจัยและผลงานทางวิชาการ
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {faculty.research.totalPublications}
                  </div>
                  <div className="text-gray-600">ผลงานวิจัยที่ตีพิมพ์</div>
                </div>

                {faculty.research.interests && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">ความสนใจด้านการวิจัย</h4>
                    <p className="text-gray-700">{faculty.research.interests}</p>
                  </div>
                )}

                {faculty.research.recentWorks && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">ผลงานวิจัยที่สำคัญ (3 ผลงานล่าสุด)</h4>
                    <p className="text-gray-700 whitespace-pre-line">{faculty.research.recentWorks}</p>
                  </div>
                )}

                {faculty.research.ongoingProjects && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">งานวิจัยที่กำลังดำเนินการอยู่</h4>
                    <p className="text-gray-700">{faculty.research.ongoingProjects}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Academic Service */}
            {faculty.academicService && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-xl border-b pb-3">
                  🤝 การบริการวิชาการ
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{faculty.academicService}</p>
              </div>
            )}

            {/* Work History */}
            {faculty.workHistory && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-xl border-b pb-3">
                  💼 ประวัติการทำงาน
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{faculty.workHistory}</p>
              </div>
            )}

            {/* Hobbies */}
            {faculty.hobbies && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-xl border-b pb-3">
                  <Heart className="w-6 h-6 text-pink-600" />
                  ความสนใจพิเศษ / งานอดิเรก
                </h3>
                <p className="text-gray-700">{faculty.hobbies}</p>
              </div>
            )}

            {/* Awards */}
            {faculty.awards && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-xl border-b pb-3">
                  🏆 รางวัลและเกียรติยศ
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{faculty.awards}</p>
              </div>
            )}
          </div>

          {/* Right Column - Contact & Links */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg border-b pb-3">
                ข้อมูลติดต่อ
              </h3>

              <div className="space-y-4">
                {faculty.contact.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">อีเมล</div>
                      <a
                        href={`mailto:${faculty.contact.email}`}
                        className="text-gray-700 hover:text-blue-600 break-all"
                      >
                        {faculty.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {(faculty.contact.officePhone || faculty.contact.mobile) && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">โทรศัพท์</div>
                      <div className="text-gray-700">
                        {faculty.contact.officePhone && <div>สำนักงาน: {faculty.contact.officePhone}</div>}
                        {faculty.contact.mobile && <div>มือถือ: {faculty.contact.mobile}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {faculty.contact.office && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-500 mb-1">สถานที่</div>
                      <div className="text-gray-700">{faculty.contact.office}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {(faculty.socialLinks.googleScholar || faculty.socialLinks.researchGate ||
                faculty.socialLinks.linkedin || faculty.socialLinks.orcid) && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium text-gray-800 mb-3">ลิงก์ทางวิชาการ</h4>
                    <div className="space-y-2">
                      {faculty.socialLinks.googleScholar && (
                        <a
                          href={faculty.socialLinks.googleScholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm group"
                        >
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          Google Scholar
                        </a>
                      )}
                      {faculty.socialLinks.researchGate && (
                        <a
                          href={faculty.socialLinks.researchGate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm group"
                        >
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          ResearchGate
                        </a>
                      )}
                      {faculty.socialLinks.linkedin && (
                        <a
                          href={faculty.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm group"
                        >
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          LinkedIn
                        </a>
                      )}
                      {faculty.socialLinks.orcid && (
                        <a
                          href={`https://orcid.org/${faculty.socialLinks.orcid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm group"
                        >
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          ORCID: {faculty.socialLinks.orcid}
                        </a>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetail;
