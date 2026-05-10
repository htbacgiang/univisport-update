import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function FeedbackListDashboard({ projects: initialProjects, onEdit, onDelete }) {
  const [projects, setProjects] = useState(initialProjects || []);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (initialProjects) {
      setProjects(initialProjects);
    }
  }, [initialProjects]);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.customer?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <div className=" p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProjects.map((project) => (
          <div key={project.slug || project._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gray-200">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title || "Feedback"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Khách hàng: {project.customer}</p>

              <div className="flex gap-2 pt-3 border-t">
                <button
                  onClick={() => window.open(`/feedback/${project.slug}`, '_blank')}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded hover:bg-blue-100 transition-colors"
                >
                  👁️ Xem
                </button>
                <button
                  onClick={() => onEdit && onEdit(project)}
                  className="flex-1 px-3 py-2 bg-green-50 text-green-600 text-sm font-medium rounded hover:bg-green-100 transition-colors"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => {
                    if (confirm("Bạn có chắc chắn muốn xóa feedback này?")) {
                      onDelete && onDelete(project);
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-red-50 text-red-600 text-sm font-medium rounded hover:bg-red-100 transition-colors"
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
