import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import int_pubData from '../data/int_publicationsData';
import dm_pubData from '../data/dm_publicationsData';
import book_pubData from '../data/book_publicationsData';

const PublicationsPage = () => {
    const [filter, setFilter] = useState('All');
    const allPubs = [
        ...int_pubData.publications,
        ...dm_pubData.publications,
        ...book_pubData.publications
    ];
    const filteredPubs = allPubs.filter(p => filter === 'All' || p.type === filter);
    const years = [...new Set(filteredPubs.map(p => p.year))].sort((a, b) => b - a);

    return (
        <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <Link to="/" className="text-blue-600 font-bold mb-4 inline-block">← 메인으로 돌아가기</Link>
                    <h2 className="text-5xl font-black text-gray-900 mb-6">Publications</h2>

                    {/* 분류 필터 */}
                    <div className="flex justify-center gap-4 mt-8">
                        {['All', 'International Conference', 'Domestic Journal', 'Book'].map(t => (
                            <button
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`px-6 py-2 rounded-full font-bold transition-all ${filter === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                {/* 연도별 출판물 리스트 */}
                {years.map(year => (
                    <div key={year} className="mb-16">
                        <h3 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-100 pb-2">{year}</h3>
                        <div className="space-y-6">
                            {filteredPubs.filter(p => p.year === year).map(pub => (
                                <div key={pub.id} className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                                    <span className="text-blue-500 font-bold text-sm uppercase tracking-widest">{pub.type}</span>
                                    <h4 className="text-xl font-bold text-gray-900 mt-2 mb-3">{pub.title}</h4>
                                    <p className="text-gray-600 mb-2">{pub.authors}</p>
                                    <p className="text-gray-400 italic mb-4">{pub.venue}</p >
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PublicationsPage;
