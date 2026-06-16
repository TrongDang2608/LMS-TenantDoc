# CHAT_README: Hướng Dẫn Tiếp Tục Triển Khai Dự Án LMS (Free Tier)

File này tóm tắt toàn bộ bối cảnh, công việc đã hoàn thành, lỗi hiện tại và các bước tiếp theo để bạn gửi trực tiếp sang phiên chat mới. Khi nhận được file này, AI mới sẽ hiểu ngay cần làm gì.

---

## 1. Bối Cảnh Dự Án
- **Tên dự án:** LMS (Learning Management System).
- **Cấu trúc thư mục:**
  - `d:/HOC_TAP/HKDN/BTL/LMS_HKDN/e-learning.backend`: Backend .NET 10 API.
  - `d:/HOC_TAP/HKDN/BTL/LMS_HKDN/e-learning.web`: Frontend Next.js (React 19, Material-UI).
- **Mô hình kiến trúc:** Multi-tenant (quản lý nhiều trường học thông qua subdomain).
- **Mục tiêu triển khai:** Host miễn phí (Free Tier) dùng Docker Hub, Neon (PostgreSQL), Render (Backend), Vercel (Frontend), Upstash (Redis).

---

## 2. Các Công Việc Đã Hoàn Thành (75%)

### Giai đoạn 1: Cơ sở dữ liệu & Cache
- [x] Tạo dự án PostgreSQL v16 trên **Neon.tech**.
- [x] Tạo Redis Database trên **Upstash.com** (dùng TCP/TLS connection string).
- [x] Nạp thành công các schema migrations từ `e-learning.backend/database` (V1 đến V16) vào Neon thông qua Neon Web Editor / SQL Editor.

### Giai đoạn 2: Đóng gói Backend
- [x] Đóng gói thành công Docker Image cho Backend.
- [x] Đẩy (push) image lên Docker Hub tại: `docker.io/trongdang2608/lms-backend:latest`.

### Giai đoạn 3: Triển khai Backend (Render)
- [x] Tạo **Web Service** trên **Render** sử dụng image trên Docker Hub.
- [x] Cấu hình đầy đủ các biến môi trường (ConnectionStrings, JWT, Redis TLS...).
- [x] Dịch vụ Backend đã **LIVE** thành công tại URL:
  `https://lms-backend-latest-p05f.onrender.com`

---

## 3. Công Việc Đang Làm & Lỗi Hiện Tại (Frontend Vercel)

- **Trạng thái:** Đã deploy Frontend lên **Vercel** tại:
  `https://lms-tenant-doc.vercel.app/`
- **Kết quả:** Build trên Vercel báo **SUCCESS** hoàn toàn, nhưng truy cập bất kỳ trang nào (bao gồm trang chủ `/`, `/tenant-admin/dashboard/`, `/auth/login/`) đều bị lỗi **404 NOT_FOUND** của Vercel.
- **Phân tích:**
  - Không có file `middleware.ts` trong frontend làm thay đổi routing.
  - File config `next.config.js` có option `trailingSlash: true`.
  - Nghi ngờ lỗi do **cách cấu hình domain/production deployment** trên Vercel, hoặc Vercel deploy nhầm branch/thư mục dẫn đến server render rỗng.

---

## 4. Nhiệm Vụ Tiếp Theo Cần Làm (Next Steps)
1. **Khắc phục lỗi 404 Vercel:**
   - Kiểm tra tab **Deployments** trên Vercel xem bản deploy thành công gần nhất đã được set làm **Production Deployment** chưa.
   - Thử truy cập bằng URL deploy trực tiếp dạng `https://<deployment-id>.vercel.app` để xem có bị 404 không.
   - Kiểm tra cấu hình **Root Directory** trong Settings của Vercel (phải trỏ vào `e-learning.web`).
2. **Kiểm tra liên kết Backend & Frontend:**
   - Sau khi sửa được lỗi 404, kiểm tra API Call từ Frontend sang Backend có hoạt động không.
   - Test luồng đăng nhập (Sử dụng tài khoản superadmin mặc định đã seed).
3. **Rotate/Đổi Key Bảo Mật:**
   - Thay đổi mật khẩu Redis Upstash vì đã bị lộ thông tin cấu hình trong lịch sử chat cũ.
