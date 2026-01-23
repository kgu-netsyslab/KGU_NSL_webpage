// 연구실 소개 섹션 컴포넌트
import { labInfo, SectionTitle } from '../../utils/constants';

const About = () => (
  <section id="about" className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <SectionTitle>연구실 소개</SectionTitle>
      <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
        {labInfo.description}
      </p>
    </div>
  </section>
);

export default About;
