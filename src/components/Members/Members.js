import React from 'react';
import { SectionTitle } from '../../utils/constants';
import students from '../../data/StudentsData'; // 대학원생 데이터

const MemberCard = ({ name, image, interests, type }) => (
  <div className="bg-gray-50 rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300">
    <img 
      src={image} 
      alt={`${name} ${type}`} 
      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      loading="lazy"
    />
    <h3 className="text-xl font-bold text-gray-800">{name}</h3>
    <p className="text-blue-500 mb-2">{type}</p>
    <p className="text-gray-600">{interests}</p>
  </div>
);

const Members = ({ professorData }) => {
  const info = professorData; // 교수님 데이터

  return (
    <section id="members" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <SectionTitle>구성원</SectionTitle>
        
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-gray-700 mb-8">지도교수</h3>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 max-w-2xl w-full">
              <div className="flex-shrink-0">
                <img 
                  src={info.image}
                  alt={`${info.name} 교수`}
                  className="w-48 h-64 rounded-lg object-cover shadow-sm"
                  loading="lazy"
                />
              </div>
              <div className="text-left w-full">
                <h4 className="text-3xl font-bold text-blue-600 mb-1">{info.name}</h4>
                <p className="text-lg text-gray-500 mb-4 font-medium">{info.role}</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-800">학력 :</p>
                    <ul className="list-disc list-inside text-gray-600 text-sm pl-1">
                      {info.education.map((edu, i) => <li key={i}>{edu}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">연락처 :</p>
                    <p className="text-gray-600 text-sm">Email : {info.contact.email}</p>
                    <p className="text-gray-600 text-sm">Tel : {info.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-gray-700 mb-8">대학원생</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {students.master.map(s => (
                <div key={s.id} className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] max-w-sm">
                  <MemberCard 
                    name={s.name} 
                    image={s.image} 
                    interests={s.interests} 
                    type={s.type}
                  />
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Members;
