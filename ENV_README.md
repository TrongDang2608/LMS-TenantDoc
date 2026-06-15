# Cấu hình Môi trường & Thiết lập Dự án (Environment & Config Files)

Tài liệu này liệt kê các file cấu hình cần có để chạy dự án LMS. Một số file chứa cấu hình môi trường hoặc secret nên không nên commit lên Git; nếu thiếu file nào bên dưới, hãy liên hệ admin để được cấp bản an toàn.

---

## 1. Backend (e-learning.backend)

### 1.1 Docker deploy config
**Vị trí:** `e-learning.backend/deploy/docker/`

- **`.env.dev`** — file `.env`
  - Chứa biến môi trường cho Docker Compose dev: DB host/port, Redis, MinIO, JWT, storage keys.
- **`.env.minio`** — file `.env`
  - Chứa cấu hình riêng cho MinIO/Object Storage.

### 1.2 API config
**Vị trí:** `e-learning.backend/src/Api/Aig.Lms.Api/`

- **`appsettings.json`** — file `.json`
  - Cấu hình nền của API.
- **`appsettings.Development.json`** — file `.json`
  - Chứa cấu hình chạy local/dev, bao gồm connection strings, Redis, JWT, storage keys.
- **`appsettings.Local.json`** — file `.json` nếu dự án hoặc máy cá nhân có dùng ghi đè riêng.

### 1.3 Sub-module API config
**Vị trí:** `e-learning.backend/src/Modules/*/Aig.Lms.Modules.*.Api/`

Mỗi module có thể cần các file sau:
- **`appsettings.json`** — file `.json`
- **`appsettings.Development.json`** — file `.json`
- **`appsettings.Local.json`** — file `.json` nếu có

Ví dụ các thư mục thường gặp:
- `src/Modules/AuditLogs/Aig.Lms.Modules.AuditLogs.Api/`
- `src/Modules/Authorization/Aig.Lms.Modules.Authorization.Api/`
- `src/Modules/ContentDelivery/Aig.Lms.Modules.ContentDelivery.Api/`
- `src/Modules/ContentManagement/Aig.Lms.Modules.ContentManagement.Api/`
- `src/Modules/Downloads/Aig.Lms.Modules.Downloads.Api/`
- `src/Modules/Identity/Aig.Lms.Modules.Identity.Api/`
- `src/Modules/Reports/Aig.Lms.Modules.Reports.Api/`
- `src/Modules/Schools/Aig.Lms.Modules.Schools.Api/`
- `src/Modules/Tenancy/Aig.Lms.Modules.Tenancy.Api/`
- `src/Modules/Users/Aig.Lms.Modules.Users.Api/`
- `src/Modules/Viewer/Aig.Lms.Modules.Viewer.Api/`

---

## 2. Frontend (e-learning.web)

### 2.1 Web app env config
**Vị trí:** `e-learning.web/`

- **`.env.development.local`** — file `.env`
  - Chứa API URL, NextAuth config, client keys, biến chạy local.
- **`.env.local`** — file `.env` nếu môi trường cá nhân cần ghi đè.
- **`.env.test`** — file `.env` nếu dùng cho test.
- **`.env.example`** — file mẫu, không chứa secret thật.

---

## 3. Ghi chú an toàn

> [!IMPORTANT]
> Nếu dự án của bạn cần các file ở trên nhưng chưa có, hãy **liên hệ admin** để lấy đúng nội dung.
>
> Không tự tạo hoặc chia sẻ secret trong chat, vì các file này có thể chứa mật khẩu, connection string, JWT secret, Redis password, hoặc Access/Secret Key.

