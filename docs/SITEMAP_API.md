# Sitemap API Documentation

## Tổng quan

Sitemap tự động cho phép tạo và cập nhật sitemap của website một cách đơn giản bằng cách chạy script.

## Cách sử dụng

### 1. **Generate Sitemap (Khuyến nghị)**
```bash
# Chạy script để tạo sitemap
npm run generate-sitemap
```

Script này sẽ:
- Tạo sitemap với static routes và product categories
- Tạo file `public/sitemap.xml`
- Tạo file `public/robots.txt`
- Hiển thị thống kê

**Lưu ý:** Script này chỉ tạo static routes. Để có dynamic routes (posts, products), bạn cần sử dụng API endpoints hoặc tích hợp với database.

### 2. **Truy cập sitemap (Tự động tạo)**
**GET** `/api/sitemap.xml`

Tự động tạo sitemap với dữ liệu mới nhất từ database và lưu vào `public/sitemap.xml`.

**Response:** XML sitemap với tất cả routes (static + dynamic từ database)

### 3. **Truy cập robots.txt**
**GET** `/api/robots.txt`

Đọc và trả về file robots.txt từ public folder.

**Response:** Text robots.txt

## Cách sử dụng Auto-Generate APIs

### 1. **Truy cập sitemap tự động (Khuyến nghị):**
```bash
# Truy cập sitemap (tự động tạo với dữ liệu mới nhất)
curl https://dongphucunivi.com/api/sitemap.xml

# Truy cập robots.txt
curl https://dongphucunivi.com/api/robots.txt
```

### 2. **Trong trình duyệt:**
- Truy cập: `https://dongphucunivi.com/api/sitemap.xml`
- Truy cập: `https://dongphucunivi.com/api/robots.txt`

### 3. **Lợi ích của Auto-Generate APIs:**
- ✅ **Luôn cập nhật**: Mỗi lần truy cập sẽ lấy dữ liệu mới nhất từ database
- ✅ **Tự động tạo file**: Tự động tạo `public/sitemap.xml` với dữ liệu mới nhất
- ✅ **SEO friendly**: Search engines sẽ luôn thấy URLs mới nhất
- ✅ **Bao gồm đầy đủ**: Tất cả static routes + product categories + posts + products

## Cấu hình

### Environment Variables

Thêm vào `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/univi
NEXTAUTH_URL=https://dongphucunivi.com
```

## Scripts

### NPM Scripts

```bash
# Generate sitemap (khuyến nghị)
npm run generate-sitemap

# Generate sitemap với next-sitemap
npm run sitemap
```

### Manual Script

```bash
node scripts/generate-sitemap-simple.js
```

## Cập nhật sitemap

Để cập nhật sitemap khi có thay đổi dữ liệu:

1. **Chạy script thủ công:**
   ```bash
   npm run generate-sitemap
   ```

2. **Hoặc setup cron job** để chạy tự động:
   ```bash
   # Chạy mỗi ngày lúc 2:00 AM
   0 2 * * * cd /path/to/project && npm run generate-sitemap
   ```

## Files được tạo/cập nhật

- `public/sitemap.xml` - Sitemap chính (chứa tất cả URLs)
- `public/robots.txt` - Robots.txt với sitemap reference

## Các routes được bao gồm trong sitemap

### 1. **Static Routes (7 routes):**
- Trang chủ (/)
- Giới thiệu (/gioi-thieu)
- Sản phẩm (/san-pham)
- Bài viết (/bai-viet)
- Liên hệ (/lien-he)
- Đăng nhập (/dang-nhap)
- Đăng ký (/dang-ky)

### 2. **Product Category Routes (12 routes):**
- Đồng phục áo polo (/san-pham/dong-phuc-ao-polo)
- Đồng phục áo thun (/san-pham/dong-phuc-ao-thun)
- Đồng phục chạy bộ (/san-pham/dong-phuc-chay-bo)
- Đồng phục công sở (/san-pham/dong-phuc-cong-so)
- Đồng phục golf tennis (/san-pham/dong-phuc-golf-tennis)
- Đồng phục gym (/san-pham/dong-phuc-gym)
- Đồng phục lễ tân (/san-pham/dong-phuc-le-tan)
- Đồng phục MMA (/san-pham/dong-phuc-mma)
- Đồng phục pickleball (/san-pham/dong-phuc-pickleball)
- Đồng phục sự kiện (/san-pham/dong-phuc-su-kien)
- Đồng phục team building (/san-pham/dong-phuc-team-building)
- Đồng phục yoga pilates (/san-pham/dong-phuc-yoga-pilates)

### 3. **Dynamic Routes:**
- **Posts**: Tất cả bài viết từ database (không bao gồm draft)
- **Products**: Tất cả sản phẩm từ database

## Cách sử dụng Auto-Generate APIs

### 1. **Truy cập sitemap tự động (Khuyến nghị):**
```bash
# Truy cập sitemap chính (tự động cập nhật)
curl https://dongphucunivi.com/api/sitemap.xml

# Truy cập robots.txt (tự động cập nhật)
curl https://dongphucunivi.com/api/robots.txt
```

### 2. **Trong trình duyệt:**
- Truy cập: `https://dongphucunivi.com/api/sitemap.xml`
- Truy cập: `https://dongphucunivi.com/api/robots.txt`

### 3. **Lợi ích của Auto-Generate APIs:**
- ✅ **Luôn cập nhật**: Mỗi lần truy cập sẽ lấy dữ liệu mới nhất từ database
- ✅ **Không cần cache**: Không cần lo lắng về việc sitemap cũ
- ✅ **SEO friendly**: Search engines sẽ luôn thấy URLs mới nhất
- ✅ **Tự động**: Không cần can thiệp thủ công
- ✅ **Bao gồm đầy đủ**: Tất cả static routes + product categories + posts + products

## Monitoring

Để monitor việc cập nhật sitemap, kiểm tra logs:

```bash
# Xem logs của sitemap updates
grep "sitemap" logs/app.log
```

## Troubleshooting

### Lỗi thường gặp

1. **Database connection error**
   - Kiểm tra MongoDB connection
   - Đảm bảo models được import đúng

2. **Permission error**
   - Kiểm tra quyền ghi file trong thư mục `public/`
   - Đảm bảo process có quyền execute `npx next-sitemap`

3. **Webhook authentication failed**
   - Kiểm tra `SITEMAP_WEBHOOK_SECRET` trong environment
   - Đảm bảo header `x-sitemap-secret` được gửi đúng

### Debug

```bash
# Test sitemap generation
curl -X POST http://localhost:3000/api/sitemap/generate

# Test webhook
curl -X POST http://localhost:3000/api/sitemap/webhook \
  -H "x-sitemap-secret: your-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"type":"test","data":{}}'
```

