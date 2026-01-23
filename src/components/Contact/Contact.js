import { labInfo, SectionTitle } from '../../utils/constants';

// 연락처 및 위치 (Contact) 컴포넌트
const Contact = () => (
  <section id="contact" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <SectionTitle>오시는 길</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-36 items-center">
        <div className="text-lg">
          <p className="mb-4 flex items-start">
            <strong className="w-24 flex-shrink-0 text-gray-800">주소</strong>
            <span className="flex-1 whitespace-nowrap">{labInfo.contact.address}</span>
          </p>
          <p className="mb-4">
            <strong className="w-24 inline-block text-gray-800">이메일</strong>
            <a href={`mailto:${labInfo.contact.email}`} className="text-blue-600 hover:underline">
              {labInfo.contact.email}
            </a>
          </p>
          <p className="mb-4">
            <strong className="w-24 inline-block text-gray-800">연락처</strong>
            <span>{labInfo.contact.phone}</span>
          </p>
        </div>
        <div className="md:pl-24">
          <div className="block rounded-lg shadow-lg overflow-hidden">
            {/* 구글맵 iframe 태그를 그대로 보존하여 삽입 */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1586.882958900697!2d127.03813837851955!3d37.30068128921297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b5c9d9184b845%3A0x6b76c196ad72ba!2z6rK96riw64yA7ZWZ6rWQIOycoeyYgeq0gA!5e0!3m2!1sko!2skr!4v1766478891177!5m2!1sko!2skr"
              width="400"
              height="300"
              style={{ border: 2, width: '100%', height: '300px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="경기대학교 지도"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Contact;
