import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AdminLayout from "../../../components/layout/AdminLayout";
import DashboardPostCard from "../../../components/common/DashboardPostCard";
import Pagination from "../../../components/common/Pagination";
import { formatPosts, readPostsFromDb } from "../../../lib/utils";
import { PostDetail } from "../../../utils/types";
import Post from "../../../models/Post";
import db from "../../../utils/db";
import styles from "../../../styles/posts.module.css";
import { Notebook, Plus, Search } from "lucide-react";
import Image from "next/image";

const limit = 12; // Số bài viết mỗi trang
const MAX_FEATURED = 4;

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Posts: NextPage<Props> = ({ initialPosts, totalPages }) => {
  const [posts, setPosts] = useState<PostDetail[]>(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Featured state
  const [featuredPosts, setFeaturedPosts] = useState<PostDetail[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const [showFeaturedPicker, setShowFeaturedPicker] = useState(false);

  // Drag & drop state
  const [draggingId, setDraggingId] = useState<string | null>(null);   // id đang kéo
  const [draggingFrom, setDraggingFrom] = useState<"featured" | "list" | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null); // slot index đang hover

  // ── Fetch featured posts ──
  const fetchFeatured = useCallback(async () => {
    setFeaturedLoading(true);
    try {
      const { data } = await axios.get("/api/posts/featured");
      // Sort tăng dần theo featuredOrder
      const sorted = (data.posts || []).sort(
        (a: PostDetail, b: PostDetail) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999)
      );
      setFeaturedPosts(sorted);
    } catch {
      // ignore
    } finally {
      setFeaturedLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  // ── Remove from featured ──
  const handleRemoveFeatured = async (postId: string) => {
    try {
      await axios.put("/api/posts/featured", { action: "remove", postId });
      toast.success("Đã xóa khỏi danh sách nổi bật");
      fetchFeatured();
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, isFeatured: false, featuredOrder: undefined } : p))
      );
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  // ── Save reorder to API ──
  const saveReorder = async (newList: PostDetail[]) => {
    try {
      await axios.put("/api/posts/featured", {
        action: "reorder",
        items: newList.map((p, i) => ({ postId: p.id, order: i + 1 })),
      });
    } catch {
      toast.error("Không thể lưu thứ tự mới");
      fetchFeatured();
    }
  };

  // ── Add to featured ──
  const handleAddFeatured = async (postId: string) => {
    if (featuredPosts.length >= MAX_FEATURED) {
      toast.error("Đã đủ 4 bài nổi bật!");
      return;
    }
    try {
      await axios.put("/api/posts/featured", { action: "add", postId });
      toast.success("Đã thêm vào danh sách nổi bật");
      setShowFeaturedPicker(false);
      fetchFeatured();
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, isFeatured: true } : p))
      );
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  // ──────────────────────────────────────────────────────
  // DRAG & DROP — HTML5 native
  // ──────────────────────────────────────────────────────

  // Kéo trong vùng featured: reorder
  const handleFeaturedDragStart = (e: React.DragEvent, postId: string) => {
    setDraggingId(postId);
    setDraggingFrom("featured");
    e.dataTransfer.effectAllowed = "move";
  };

  // Kéo từ danh sách bài viết xuống vùng featured
  const handleListDragStart = (e: React.DragEvent, postId: string) => {
    setDraggingId(postId);
    setDraggingFrom("list");
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleSlotDragOver = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggingFrom === "list" ? "copy" : "move";
    setDragOverSlot(slotIdx);
  };

  const handleSlotDrop = async (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    setDragOverSlot(null);
    if (!draggingId) return;

    if (draggingFrom === "list") {
      // Thêm bài mới vào slot cụ thể (nếu slot trống)
      if (featuredPosts.length >= MAX_FEATURED) {
        toast.error("Đã đủ 4 bài nổi bật!");
        return;
      }
      await handleAddFeatured(draggingId);
      setDraggingId(null);
      setDraggingFrom(null);
      return;
    }

    // Kéo trong featured: swap vị trí
    if (draggingFrom === "featured") {
      const fromIdx = featuredPosts.findIndex((p) => p.id === draggingId);
      if (fromIdx === -1 || fromIdx === slotIdx) {
        setDraggingId(null);
        setDraggingFrom(null);
        return;
      }
      const newList = [...featuredPosts];
      const [moved] = newList.splice(fromIdx, 1);
      newList.splice(slotIdx, 0, moved);
      setFeaturedPosts(newList); // optimistic
      await saveReorder(newList);
    }

    setDraggingId(null);
    setDraggingFrom(null);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDraggingFrom(null);
    setDragOverSlot(null);
  };

  // Hàm xử lý đổi trang (server-side pagination)
  const handlePageChange = async (page: number) => {
    try {
      setIsLoading(true);
      setCurrentPage(page);
      const skip = (page - 1) * limit;
      const { data } = await axios.get(`/api/posts?limit=${limit}&skip=${skip}&includeDrafts=true`);
      setPosts(data.posts);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi tải dữ liệu!");
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý xoá bài viết theo postId
  const handleDelete = async (postId: string) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      if (featuredPosts.some((p) => p.id === postId)) fetchFeatured();
      toast.success("Bài viết đã được xóa thành công!");
    } catch (error: any) {
      console.error("Error deleting post:", error);
      const errorMessage = error.response?.data?.error || "Có lỗi xảy ra khi xóa bài viết!";
      toast.error(errorMessage);
    }
  };

  // Xử lý chuyển đổi trạng thái nháp/công khai
  const handleToggleStatus = async (postId: string, isDraft: boolean) => {
    try {
      await axios.put("/api/posts/draft", {
        postId,
        isDraft
      });
      
      setPosts((prevPosts) => 
        prevPosts.map((post) => 
          post.id === postId 
            ? { ...post, isDraft } 
            : post
        )
      );
      
      if (isDraft) {
        toast.success("Bài viết đã được chuyển về trạng thái nháp!");
      } else {
        toast.success("Bài viết đã được công khai!");
      }
    } catch (error: any) {
      console.error("Error toggling status:", error);
      toast.error("Có lỗi xảy ra khi thay đổi trạng thái bài viết!");
    }
  };

  // Lọc bài viết theo search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Bài có thể chọn làm featured (từ picker modal)
  const pickablePosts = posts.filter((p) => !p.isFeatured && !p.isDraft);

  // Hàm xử lý chuyển đến trang thêm bài viết mới
  const handleAddNewPost = () => {
    router.push("/dashboard/them-bai-viet");
  };

  return (
    <AdminLayout>
      <div className={styles.postsContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            <Notebook style={{ width: 20, height: 20, color: "#105d97", flexShrink: 0 }} />
            Quản lý bài viết
          </h1>
          <p className={styles.subtitle}>
            Kéo bài viết vào ô nổi bật phía dưới để thêm nhanh
            <span className={styles.postCount}>
              ({posts.length} bài viết · trang {currentPage}/{totalPages})
            </span>
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
            FEATURED MANAGER
        ══════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 mt-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="text-amber-400 text-xl">★</span>
                Bài viết nổi bật
                <span className="ml-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                  {featuredPosts.length}/{MAX_FEATURED}
                </span>
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Kéo thả thẻ để sắp xếp thứ tự · Vị trí 1 hiển thị đầu tiên trên trang /bai-viet
              </p>
            </div>
            <button
              onClick={() => setShowFeaturedPicker(true)}
              disabled={featuredPosts.length >= MAX_FEATURED}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                featuredPosts.length >= MAX_FEATURED
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
              }`}
              title={featuredPosts.length >= MAX_FEATURED ? "Đã đủ 4 bài nổi bật" : ""}
            >
              <span className="text-base leading-none">+</span>
              Thêm bài
            </button>
          </div>

          {/* 4 slots hiển thị dạng card ngang */}
          {featuredLoading ? (
            <div className="flex gap-4">
              {[...Array(MAX_FEATURED)].map((_, i) => (
                <div key={i} className="flex-1 h-40 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(MAX_FEATURED)].map((_, slotIdx) => {
                const post = featuredPosts[slotIdx];
                const isOver = dragOverSlot === slotIdx;
                const isDraggingThis = post && draggingId === post.id;

                return (
                  <div
                    key={slotIdx}
                    onDragOver={(e) => handleSlotDragOver(e, slotIdx)}
                    onDrop={(e) => handleSlotDrop(e, slotIdx)}
                    onDragLeave={() => setDragOverSlot(null)}
                    className={`relative rounded-xl border-2 transition-all duration-200 min-h-[160px] ${
                      post
                        ? isDraggingThis
                          ? "border-amber-300 bg-amber-50 opacity-50"
                          : isOver
                          ? "border-amber-400 bg-amber-50 shadow-lg scale-[1.02]"
                          : "border-amber-200 bg-white shadow-sm hover:shadow-md"
                        : isOver
                        ? "border-amber-400 bg-amber-50 scale-[1.02] shadow-lg"
                        : "border-dashed border-gray-200 bg-gray-50"
                    }`}
                  >
                    {/* Số thứ tự */}
                    <div className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                      post ? "bg-amber-400 text-white" : "bg-gray-200 text-gray-400"
                    }`}>
                      {slotIdx + 1}
                    </div>

                    {post ? (
                      <div
                        draggable
                        onDragStart={(e) => handleFeaturedDragStart(e, post.id)}
                        onDragEnd={handleDragEnd}
                        className="flex flex-col h-full cursor-grab active:cursor-grabbing select-none"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-full aspect-video rounded-t-xl overflow-hidden bg-gray-100">
                          {post.thumbnail ? (
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              fill
                              className="object-cover"
                              draggable={false}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-300">📝</div>
                          )}
                          {/* Remove button */}
                          <button
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => { e.stopPropagation(); handleRemoveFeatured(post.id); }}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center hover:bg-red-500 transition-colors z-20"
                            title="Xóa khỏi nổi bật"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Info */}
                        <div className="p-2 flex-1">
                          <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug">{post.title}</p>
                          <p className="text-xs text-gray-400 mt-1 truncate">{post.category || "—"}</p>
                        </div>

                        {/* Drag hint */}
                        <div className="px-2 pb-2 text-xs text-gray-300 flex items-center gap-1">
                          <span>⠿</span> Kéo để đổi vị trí
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-4 text-center gap-2">
                        <span className="text-3xl text-gray-200">☆</span>
                        <p className="text-xs text-gray-400">Kéo bài viết vào đây</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MODAL PICKER */}
        {showFeaturedPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Chọn bài viết nổi bật</h3>
                <button
                  onClick={() => setShowFeaturedPicker(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
                >✕</button>
              </div>
              <div className="overflow-y-auto flex-1 p-4 space-y-2">
                {pickablePosts.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">Không có bài viết nào để chọn</p>
                ) : (
                  pickablePosts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => handleAddFeatured(post.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all text-left"
                    >
                      {post.thumbnail ? (
                        <Image src={post.thumbnail} alt={post.title} width={48} height={36} className="object-cover rounded-lg flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-9 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-xs">📝</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                        <p className="text-xs text-gray-400">{post.category || "Không có danh mục"}</p>
                      </div>
                      <span className="text-amber-500 text-sm flex-shrink-0 font-semibold">+ Thêm</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className={styles.actionsBar}>
          <div className={styles.searchBox}>
            <Search style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#94a3b8" }} />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.addButton} onClick={handleAddNewPost}>
            <Plus style={{ width: 15, height: 15 }} />
            Thêm bài viết mới
          </button>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Notebook style={{ width: 40, height: 40, color: "#cbd5e1", margin: "0 auto" }} />
            </div>
            <h3 className={styles.emptyTitle}>Không có bài viết nào</h3>
            <p className={styles.emptyDescription}>
              {searchTerm ? "Không tìm thấy bài viết phù hợp với từ khóa tìm kiếm." : "Bắt đầu tạo bài viết đầu tiên của bạn."}
            </p>
            <button className={styles.addButton} onClick={handleAddNewPost}>
              <Plus style={{ width: 15, height: 15 }} />
              Tạo bài viết mới
            </button>
          </div>
        ) : (
          <div className={styles.postsGrid}>
            {filteredPosts.map((post) => {
              const canDrag = !post.isFeatured && !post.isDraft && featuredPosts.length < MAX_FEATURED;
              return (
                <div
                  key={post.slug}
                  draggable={canDrag}
                  onDragStart={canDrag ? (e) => handleListDragStart(e, post.id) : undefined}
                  onDragEnd={handleDragEnd}
                  className={`relative ${canDrag ? "cursor-grab active:cursor-grabbing" : ""}`}
                >
                  {/* Drag badge */}
                  {canDrag && (
                    <div className="absolute top-2 left-2 z-10 px-1.5 py-0.5 bg-amber-400 text-white text-xs rounded font-semibold pointer-events-none select-none">
                      ⠿ Kéo lên
                    </div>
                  )}
                  <DashboardPostCard
                    post={post}
                    onDeleteClick={() => handleDelete(post.id)}
                    onToggleStatus={handleToggleStatus}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Info & Controls */}
        {totalPages > 1 && (
          <div className={styles.paginationSection}>
            <div className={styles.paginationInfo}>
              <span>Trang {currentPage} / {totalPages}</span>
              <span>•</span>
              <span>{posts.length} bài viết trên trang này</span>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  initialPosts: PostDetail[];
  totalPages: number;
}> = async () => {
  try {
    await db.connectDb();

    // Lấy tất cả bài viết bao gồm cả nháp cho dashboard
    const totalPosts = await Post.countDocuments({});
    const totalPages = Math.ceil(totalPosts / limit);
    
    // Sử dụng readPostsFromDb với includeDrafts=true cho admin dashboard
    const posts = await readPostsFromDb(limit, 0, 0, true, true);
    const formattedPosts = formatPosts(posts);

    return {
      props: {
        initialPosts: formattedPosts,
        totalPages,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default Posts;
