import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import AdminLayout from '../../../components/layout/AdminLayout';
import Link from 'next/link';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Trash2, Plus, Database, AlertCircle, X } from 'lucide-react';
import styles from '../../../styles/dashboard-products.module.css';

export default function JSONProductsListPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [limit, setLimit] = useState(10);

  const tableContainerRef = useRef(null);

  // Categories from products.json
  const categories = [
    'dong-phuc-gym',
    'dong-phuc-yoga-pilates',
    'dong-phuc-pickleball',
    'dong-phuc-chay-bo',
    'dong-phuc-mma',
    'dong-phuc-ao-polo',
    'dong-phuc-cong-so',
    'dong-phuc-team-building'
  ];

  const categoryNames = {
    'dong-phuc-gym': 'Đồng phục Gym',
    'dong-phuc-yoga-pilates': 'Đồng phục Yoga - Pilates',
    'dong-phuc-pickleball': 'Đồng phục Pickleball',
    'dong-phuc-chay-bo': 'Đồng phục Chạy bộ',
    'dong-phuc-mma': 'Đồng phục MMA',
    'dong-phuc-ao-polo': 'Đồng phục áo Polo',
    'dong-phuc-cong-so': 'Đồng phục công sở',
    'dong-phuc-team-building': 'Đồng phục Team building'
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/products');
      const products = response.data.products || [];
      console.log('Products:', products);
      setAllProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Không thể tải danh sách sản phẩm', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.maSanPham.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoryNameVN.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredProducts.length / limit));

    if (tableContainerRef.current) {
      tableContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [page, filteredProducts, limit]);

  const handleDelete = async () => {
    if (!productToDelete) return;

    setLoading(true);
    try {
      await axios.delete(`/api/products?id=${productToDelete}`);
      toast.success('Sản phẩm đã được xóa thành công', {
        position: 'top-right',
        autoClose: 3000,
      });
      // Ensure proper type comparison (handle both number and string IDs)
      const updatedProducts = allProducts.filter((product) =>
        String(product.id) !== String(productToDelete) &&
        String(product._id) !== String(productToDelete)
      );
      setAllProducts(updatedProducts);
      setTotalPages(Math.ceil(updatedProducts.length / limit));
      if (updatedProducts.length > 0 && displayedProducts.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(error.response?.data?.err || 'Không thể xóa sản phẩm', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const ellipsis = "...";

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, page - 2);
      let endPage = Math.min(totalPages, page + 2);

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push(ellipsis);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push(ellipsis);
        pageNumbers.push(totalPages);
      }
    }

    return (
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={styles.paginationButton}
        >
          Trước
        </button>
        {pageNumbers.map((num, index) => (
          <button
            key={index}
            onClick={() => typeof num === 'number' && setPage(num)}
            disabled={num === ellipsis}
            className={`${styles.pageNumber} ${num === page
              ? styles.active
              : num === ellipsis
                ? styles.ellipsis
                : ''
              }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className={styles.paginationButton}
        >
          Sau
        </button>
      </div>
    );
  };

  return (
    <AdminLayout title="Quản lý sản phẩm">
      <div className={styles.container}>

        {/* Search and Filter */}
        <div className={styles.filterSection}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.categoryFilter}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categorySelect}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {categoryNames[category]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pagination Info */}
        <div className={styles.paginationInfo}>
          <div className={styles.paginationStats}>
            Hiển thị {displayedProducts.length > 0 ? (page - 1) * limit + 1 : 0} - {Math.min(page * limit, filteredProducts.length)} trong tổng số {filteredProducts.length} sản phẩm
          </div>
          <div className={styles.paginationControls}>
            <span className="text-sm text-gray-600">Hiển thị:</span>
            <select
              value={limit}
              onChange={(e) => {
                const newLimit = parseInt(e.target.value);
                setLimit(newLimit);
                setPage(1);
              }}
              className={styles.pageSizeSelect}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Fixed Table Header */}
        <div className={styles.fixedTableHeader}>
          <table className={styles.headerTable}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader} scope="col">
                  STT
                </th>
                <th className={styles.tableHeader} scope="col">
                  Tên sản phẩm
                </th>
                <th className={styles.tableHeader} scope="col">
                  Ảnh đại diện
                </th>
                <th className={styles.tableHeader} scope="col">
                  Mã sản phẩm
                </th>
                <th className={styles.tableHeader} scope="col">
                  Danh mục
                </th>
                <th className={styles.tableHeader} scope="col">
                  Giá
                </th>
                <th className={styles.tableHeader} scope="col">
                  Trạng thái
                </th>
                <th className={styles.tableHeader} scope="col">
                  Hành động
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {loading && allProducts.length === 0 ? (
          <div className={styles.loading}>Đang tải...</div>
        ) : (
          <div className={styles.mainContent}>
            <div ref={tableContainerRef} className={styles.tableContainer}>
              <table
                className={styles.table}
                role="grid"
                aria-label="Danh sách sản phẩm JSON"
              >
                <tbody className={styles.tableBody}>
                  {displayedProducts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className={styles.emptyState}
                      >
                        {filteredProducts.length === 0 ? 'Không có sản phẩm nào phù hợp' : 'Không có sản phẩm nào'}
                      </td>
                    </tr>
                  ) : (
                    displayedProducts.map((product, index) => (
                      <tr
                        key={product.id}
                        className={styles.tableRow}
                        role="row"
                      >
                        <td className={styles.tableCell}>{(page - 1) * limit + index + 1}</td>
                        <td className={styles.tableCell}>
                          <span className={styles.productName}>{product.name || 'N/A'}</span>
                        </td>
                        <td className={styles.tableCell}>
                          <Image
                            src={product.image || '/images/placeholder.jpg'}
                            alt={product.name || 'Sản phẩm'}
                            width={40}
                            height={40}
                            className={styles.productImage}
                          />
                        </td>
                        <td className={styles.tableCell}>
                          <span className={styles.productCode}>{product.maSanPham || 'N/A'}</span>
                        </td>
                        <td className={styles.tableCell}>
                          <span className={styles.category}>
                            {product.categoryNameVN || categoryNames[product.category] || 'Không xác định'}
                          </span>
                        </td>
                        <td className={styles.tableCell}>
                          <span className={styles.price}>
                            {product.price?.toLocaleString('vi-VN') || 0}đ
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className={styles.originalPrice}>
                                {' '}({product.originalPrice.toLocaleString('vi-VN')}đ)
                              </span>
                            )}
                          </span>
                        </td>
                        <td className={styles.tableCell}>
                          <div className={styles.statusContainer}>
                            {product.isNew && (
                              <span className={`${styles.status} ${styles.newStatus}`}>Mới</span>
                            )}
                            {product.isFeatured && (
                              <span className={`${styles.status} ${styles.featuredStatus}`}>Nổi bật</span>
                            )}
                            {!product.isNew && !product.isFeatured && (
                              <span className={`${styles.status} ${styles.normalStatus}`}>Thường</span>
                            )}
                          </div>
                        </td>
                        <td className={styles.tableCell}>
                          <div className={styles.actionButtons}>
                            <Link href={`/dashboard/them-san-pham/?id=${product.id}`}>
                              <button
                                className={`${styles.actionButton} ${styles.editButton}`}
                                aria-label={`Sửa sản phẩm ${product.name || 'Sản phẩm'}`}
                              >
                                <Edit size={16} />
                              </button>
                            </Link>
                            <button
                              onClick={() => confirmDelete(product.id)}
                              className={`${styles.actionButton} ${styles.deleteButton}`}
                              aria-label={`Xóa sản phẩm ${product.name || 'Sản phẩm'}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {totalPages > 1 && renderPagination()}

        {isModalOpen && (
          <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalIconWrapper}>

              </div>
              <h3 className="text-xl font-bold text-red-500 mb-3">
                Xác nhận xóa sản phẩm
              </h3>
              <p className={styles.modalText}>
                Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.
              </p>
              <div className={styles.modalActions}>
                <button
                  onClick={closeModal}
                  className={`${styles.modalButton} ${styles.cancel}`}
                  disabled={loading}
                >
                  <X size={18} />
                  <span>Hủy bỏ</span>
                </button>
                <button
                  onClick={handleDelete}
                  className={`${styles.modalButton} ${styles.delete}`}
                  disabled={loading}
                >
                  <Trash2 size={18} />
                  <span>{loading ? 'Đang xóa...' : 'Xóa ngay'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </AdminLayout>
  );
}
