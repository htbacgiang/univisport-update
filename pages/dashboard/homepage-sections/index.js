import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import AdminLayout from "../../../components/layout/AdminLayout";
import toast from "react-hot-toast";
import {
  LayoutTemplate,
  GripVertical,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Save,
  RefreshCw,
  X,
  Pencil,
} from "lucide-react";

const CATEGORY_SUGGESTIONS = [
  { label: "Gym", category: "dong-phuc-gym", link: "/san-pham/dong-phuc-gym" },
  { label: "Pickleball", category: "dong-phuc-pickleball", link: "/san-pham/dong-phuc-pickleball" },
  { label: "Yoga - Pilates", category: "dong-phuc-yoga-pilates", link: "/san-pham/dong-phuc-yoga-pilates" },
  { label: "Áo Gió", category: "dong-phuc-ao-gio", link: "/san-pham/dong-phuc-ao-gio" },
  { label: "Golf - Tennis", category: "dong-phuc-golf-tennis", link: "/san-pham/dong-phuc-golf-tennis" },
  { label: "Áo Polo", category: "dong-phuc-ao-polo", link: "/san-pham/dong-phuc-ao-polo" },
];

const emptyForm = { title: "", category: "", viewAllLink: "", productLimit: 12 };

export default function HomepageSectionsPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = add, object = edit
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { fetchSections(); }, []);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/homepage-sections");
      setSections(data.sections.map(s => ({ ...s, id: s._id })));
    } catch {
      toast.error("Không thể tải danh sách sections");
    } finally {
      setLoading(false);
    }
  };

  const handleSortEnd = (newList) => {
    setSections(newList);
    setOrderChanged(true);
  };

  const saveOrder = async () => {
    setSaving(true);
    try {
      await axios.put("/api/homepage-sections?action=reorder", {
        orderedIds: sections.map(s => s._id || s.id),
      });
      setOrderChanged(false);
      toast.success("Đã lưu thứ tự hiển thị");
    } catch {
      toast.error("Lưu thứ tự thất bại");
    } finally {
      setSaving(false);
    }
  };

  const toggleVisible = async (section) => {
    const prev = sections;
    setSections(s => s.map(x => x._id === section._id ? { ...x, isVisible: !x.isVisible } : x));
    try {
      await axios.put(`/api/homepage-sections?id=${section._id}`, { isVisible: !section.isVisible });
      toast.success(section.isVisible ? "Đã ẩn section" : "Đã hiện section");
    } catch {
      setSections(prev);
      toast.error("Cập nhật thất bại");
    }
  };

  const updateLimit = async (section, value) => {
    const limit = Math.min(50, Math.max(1, Number(value)));
    setSections(s => s.map(x => x._id === section._id ? { ...x, productLimit: limit } : x));
    try {
      await axios.put(`/api/homepage-sections?id=${section._id}`, { productLimit: limit });
    } catch {
      toast.error("Cập nhật số lượng thất bại");
    }
  };

  const openAdd = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (section) => {
    setEditTarget(section);
    setForm({
      title: section.title,
      category: section.category,
      viewAllLink: section.viewAllLink,
      productLimit: section.productLimit,
    });
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditTarget(null); setForm(emptyForm); };

  const handleCategorySuggestion = (suggestion) => {
    setForm(f => ({
      ...f,
      category: suggestion.category,
      viewAllLink: suggestion.link,
      title: f.title || `Đồng Phục ${suggestion.label}`,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category.trim() || !form.viewAllLink.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setSaving(true);
    try {
      if (editTarget) {
        const { data } = await axios.put(`/api/homepage-sections?id=${editTarget._id}`, form);
        setSections(s => s.map(x => x._id === editTarget._id ? { ...data.section, id: data.section._id } : x));
        toast.success("Đã cập nhật section");
      } else {
        const { data } = await axios.post("/api/homepage-sections", form);
        setSections(s => [...s, { ...data.section, id: data.section._id }]);
        toast.success("Đã thêm section mới");
      }
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.err || "Lỗi xử lý");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      await axios.delete(`/api/homepage-sections?id=${deleteConfirm._id}`);
      setSections(s => s.filter(x => x._id !== deleteConfirm._id));
      toast.success("Đã xóa section");
    } catch {
      toast.error("Xóa thất bại");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const seedDefaults = async () => {
    setSaving(true);
    try {
      const { data } = await axios.post("/api/homepage-sections", { action: "seed" });
      setSections(data.sections.map(s => ({ ...s, id: s._id })));
      toast.success("Đã khởi tạo sections mặc định");
    } catch (err) {
      toast.error(err.response?.data?.err || "Khởi tạo thất bại");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Quản lý Sections Trang Chủ">
      <div className="p-6 bg-[#f8fafc] min-h-screen space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <LayoutTemplate className="w-5 h-5 text-[#105d97] shrink-0" />
            <h1 className="text-[1.375rem] font-bold text-[#0f172a] m-0">Sections Trang Chủ</h1>
          </div>
          <div className="flex items-center gap-2">
            {orderChanged && (
              <button
                onClick={saveOrder}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-[#105d97] text-white text-sm font-medium rounded-lg hover:bg-[#0d4a7a] disabled:opacity-60 transition-colors"
              >
                <Save className="w-4 h-4" />
                {saving ? "Đang lưu..." : "Lưu thứ tự"}
              </button>
            )}
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 bg-[#16a34a] text-white text-sm font-medium rounded-lg hover:bg-[#15803d] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Thêm Section
            </button>
          </div>
        </div>

        {/* Guide note */}
        <div className="flex items-start gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
          <GripVertical className="w-4 h-4 mt-0.5 shrink-0" />
          <span>Kéo thả hàng để sắp xếp thứ tự hiển thị. Bấm <strong>Lưu thứ tự</strong> sau khi sắp xếp xong.</span>
        </div>

        {/* Sections list */}
        <div className="bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[32px_1fr_160px_100px_80px_100px] gap-3 items-center px-4 py-3 bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
            <span />
            <span>Tên Section / Danh mục</span>
            <span>Link xem tất cả</span>
            <span className="text-center">Số SP</span>
            <span className="text-center">Hiển thị</span>
            <span className="text-center">Thao tác</span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <RefreshCw className="w-6 h-6 text-[#105d97] animate-spin" />
            </div>
          ) : sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-[#64748b]">
              <LayoutTemplate className="w-12 h-12 text-[#cbd5e1]" />
              <p className="text-sm">Chưa có sections nào. Bấm khởi tạo mặc định hoặc thêm mới.</p>
              <button
                onClick={seedDefaults}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-[#105d97] text-white text-sm font-medium rounded-lg hover:bg-[#0d4a7a] disabled:opacity-60 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Khởi tạo Sections Mặc Định
              </button>
            </div>
          ) : (
            <ReactSortable
              list={sections}
              setList={handleSortEnd}
              handle=".drag-handle"
              animation={150}
            >
              {sections.map((section, index) => (
                <div
                  key={section._id || section.id}
                  className={`grid grid-cols-[32px_1fr_160px_100px_80px_100px] gap-3 items-center px-4 py-3.5 border-b border-[#f1f5f9] last:border-0 transition-colors ${!section.isVisible ? "opacity-50 bg-gray-50" : "hover:bg-[#f8fafc]"}`}
                >
                  {/* Drag handle */}
                  <div className="drag-handle cursor-grab active:cursor-grabbing text-[#94a3b8] hover:text-[#64748b] flex justify-center">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Title + category */}
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a] leading-tight">{section.title}</p>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium border border-blue-100">
                      {section.category}
                    </span>
                  </div>

                  {/* View all link */}
                  <p className="text-xs text-[#64748b] truncate">{section.viewAllLink}</p>

                  {/* Product limit */}
                  <div className="flex justify-center">
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={section.productLimit}
                      onChange={e => updateLimit(section, e.target.value)}
                      onBlur={e => updateLimit(section, e.target.value)}
                      className="w-16 text-center text-sm border border-[#e2e8f0] rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#105d97]/30 focus:border-[#105d97]"
                    />
                  </div>

                  {/* Visibility toggle */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleVisible(section)}
                      title={section.isVisible ? "Ẩn section" : "Hiện section"}
                      className={`p-2 rounded-lg transition-colors ${section.isVisible ? "text-[#16a34a] hover:bg-green-50" : "text-[#94a3b8] hover:bg-gray-100"}`}
                    >
                      {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => openEdit(section)}
                      title="Chỉnh sửa"
                      className="p-2 rounded-lg text-[#105d97] hover:bg-blue-50 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(section)}
                      title="Xóa section"
                      className="p-2 rounded-lg text-[#ef4444] hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          )}
        </div>

        {/* Summary */}
        {sections.length > 0 && (
          <p className="text-xs text-[#94a3b8] text-right">
            {sections.filter(s => s.isVisible).length}/{sections.length} sections đang hiển thị
          </p>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
              <h2 className="text-base font-bold text-[#0f172a]">
                {editTarget ? "Chỉnh sửa Section" : "Thêm Section Mới"}
              </h2>
              <button onClick={closeModal} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#64748b]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={submitForm} className="px-6 py-5 space-y-4">
              {/* Category suggestions */}
              {!editTarget && (
                <div>
                  <p className="text-xs font-medium text-[#64748b] mb-2">Gợi ý danh mục:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORY_SUGGESTIONS.map(s => (
                      <button
                        key={s.category}
                        type="button"
                        onClick={() => handleCategorySuggestion(s)}
                        className="px-2.5 py-1 text-xs rounded-full border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#374151]">Tiêu đề *</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="VD: Đồng Phục Gym"
                  className="w-full text-sm border border-[#e2e8f0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#105d97]/30 focus:border-[#105d97]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#374151]">Danh mục (slug) *</label>
                <input
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  placeholder="VD: dong-phuc-gym"
                  className="w-full text-sm border border-[#e2e8f0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#105d97]/30 focus:border-[#105d97]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#374151]">Link &quot;Xem tất cả&quot; *</label>
                <input
                  value={form.viewAllLink}
                  onChange={e => setForm(f => ({ ...f, viewAllLink: e.target.value }))}
                  placeholder="VD: /san-pham/dong-phuc-gym"
                  className="w-full text-sm border border-[#e2e8f0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#105d97]/30 focus:border-[#105d97]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#374151]">Số sản phẩm hiển thị (1-50)</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={form.productLimit}
                  onChange={e => setForm(f => ({ ...f, productLimit: Number(e.target.value) }))}
                  className="w-28 text-sm border border-[#e2e8f0] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#105d97]/30 focus:border-[#105d97]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-[#64748b] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#105d97] rounded-lg hover:bg-[#0d4a7a] disabled:opacity-60 transition-colors"
                >
                  {saving ? "Đang lưu..." : editTarget ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0f172a]">Xác nhận xóa</h3>
                <p className="text-xs text-[#64748b] mt-0.5">Section <strong>{deleteConfirm.title}</strong> sẽ bị xóa vĩnh viễn.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-[#64748b] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user?.role !== "admin") {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: {} };
}
