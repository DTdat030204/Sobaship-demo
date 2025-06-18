# Soba Ship Backend

Backend project cho hệ thống **Soba Ship** — xây dựng bằng **NestJS + Prisma + PostgreSQL**.

---

## Yêu cầu môi trường (Prerequisites)

* **Node.js** v18.x hoặc mới hơn
  [https://nodejs.org](https://nodejs.org)

* **PostgreSQL** v15.x hoặc mới hơn
  [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

* **npm** 
---

## Cài đặt (Setup)

### 1. Clone dự án về máy

```bash
git clone https://github.com/your-organization/soba-ship.git
cd soba-ship/Backend
```

### 2. Cài dependencies

```bash
npm install
```

### 3. Tạo file môi trường `.env`

* Copy file `.env.example` sang `.env`:

```bash
cp .env.example .env
```

* Mở file `.env` và chỉnh thông tin kết nối database:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nestdb?schema=public"
```

### 4. Khởi tạo database & Prisma Client

* Tạo schema cho database:

```bash
npx prisma migrate dev --name init
```

* Generate Prisma Client:

```bash
npx prisma generate
```

### 5. Chạy server development

```bash
npm run start:dev
```

* Mặc định server chạy tại:

```text
http://localhost:3000
```

### 6. Xem dữ liệu DB:
```bash
npx prisma studio
```
---

## 📚
---

## 🛠️ Lệnh hữu ích

| Lệnh                                   | Chức năng                                  |
| -------------------------------------- | ------------------------------------------ |
| `npm run start:dev`                    | Chạy app ở chế độ development (hot reload) |
| `npx prisma studio`                    | Mở giao diện Prisma Studio (web)           |
| `npx prisma migrate dev --name <name>` | Tạo migration mới                          |
| `npx prisma generate`                  | Generate Prisma Client                     |

 Mỗi lần chỉnh sửa database trong schema.prisma thì chạy hai câu lệnh thứ 3, 4 ở folder prisma. 
---

