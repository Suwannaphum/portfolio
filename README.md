# Personal Portfolio — One-page + CMS

## ภาพรวมโครงการ

เว็บ Portfolio ส่วนตัวสำหรับเจ้าของคนเดียว ใช้หน้า Public แบบ One-page เพื่อแนะนำตัว นำเสนอประสบการณ์และผลงานให้ Recruiter หรือบริษัทเข้าชมได้ง่าย พร้อม Admin CMS สำหรับแก้ไขข้อมูลโดยไม่ต้องแก้ Source Code

ระบบนี้ไม่ใช่แพลตฟอร์มสำหรับผู้ใช้หลายคน และไม่มี Public Feed, User Search, Blog หรือ Contact Form ที่จัดเก็บข้อความ

## วัตถุประสงค์

- สร้างหน้า Portfolio ที่ดูเป็นมืออาชีพ โหลดเร็ว และใช้งานได้บนมือถือและ Desktop
- ให้เจ้าของจัดการ Profile, Skills, Experience และ Projects ผ่าน Admin CMS
- แสดงเฉพาะ Projects ที่เผยแพร่แล้วบนหน้า Public
- ฝึกพัฒนา Full Stack ด้วย Next.js, NestJS, REST API, Authentication และ PostgreSQL/Prisma

## กลุ่มผู้ใช้งาน

- **ผู้ชมทั่วไป:** ดู Portfolio และผลงานที่เผยแพร่แล้วโดยไม่ต้อง Login
- **เจ้าของ Portfolio:** Login เพื่อจัดการข้อมูลผ่าน Admin CMS เพียงบัญชีเดียว

## ขอบเขตฟีเจอร์ใน MVP

### 1. Public One-page Portfolio

หน้า Public ที่ `/` ต้องมี Sections ต่อไปนี้:

- **Hero:** ชื่อ, Headline, Location, Availability Status เมื่อเปิดใช้งาน, Avatar และปุ่มติดต่อ
- **About:** Bio และ Skills
- **Selected Work:** Projects ที่มีสถานะ `PUBLISHED` เท่านั้น
- **Experience:** ประสบการณ์การทำงานหรือการศึกษา
- **Contact:** Email, Social Links และ Resume PDF ถ้ามี
- **Footer:** ชื่อ, ปีปัจจุบัน และลิงก์กลับด้านบน

Project ที่แสดงได้มี:

- ชื่อ, Slug และคำอธิบาย
- Technology Stack
- Cover Image และ Gallery Images พร้อม Alt Text
- Project URL และ Source URL เมื่อมีข้อมูล
- Gallery Dialog/Lightbox ภายในหน้าเดียว ไม่สร้าง Project Detail Page

หน้า Public ต้องรองรับ Responsive Design, SEO พื้นฐาน, Keyboard Navigation, WCAG 2.2 AA, Reduced Motion และไม่ส่ง Draft Project ใน Public API response

### 2. Admin CMS

เจ้าของ Portfolio สามารถ:

- Login และ Logout ด้วย Email/Password
- ดู Dashboard Summary และ Quick Actions ที่ `/admin`
- แก้ไข Profile, Headline, Bio, Location, Email, Availability Status, Avatar, Resume PDF และ Social Links
- เพิ่ม แก้ไข ลบ และจัดลำดับ Skills
- เพิ่ม แก้ไข ลบ และจัดลำดับ Experience
- สร้าง อ่าน แก้ไข ลบ และจัดลำดับ Projects
- เปลี่ยนสถานะ Project ระหว่าง `DRAFT` และ `PUBLISHED`
- อัปโหลด Cover Image, Gallery Images, Avatar และ Resume PDF
- Preview ข้อมูลจากค่าปัจจุบันในฟอร์มก่อนบันทึกหรือ Publish โดยไม่ส่ง Draft ผ่าน Public API

Profile, Skills และ Experience ไม่มี Draft state และมีผลบน Public ทันทีเมื่อ Save

Project ที่เป็น `PUBLISHED` เมื่อแก้ไขและ Save จะมีผลบน Public ทันที ไม่มี Revision/Versioning ใน MVP

### 3. Media Management

- ใช้ Cloudinary สำหรับ Avatar, Cover Image, Gallery Images และ Resume PDF
- Browser ส่งไฟล์เข้า Backend เท่านั้น; Backend เป็นผู้ตรวจสอบและอัปโหลดด้วย Cloudinary Secret
- ประเภทไฟล์ที่อนุญาต: JPEG, PNG, WebP และ PDF
- รูปภาพมีขนาดสูงสุด 10MB ต่อไฟล์
- Resume PDF มีขนาดสูงสุด 20MB ต่อไฟล์
- Gallery มีได้สูงสุด 10 รูปต่อ Project
- Backend ต้องตรวจ MIME Type และขนาดไฟล์ซ้ำ แม้ Frontend จะตรวจแล้ว
- การ Remove Media จะลบ Database Reference ก่อน และไม่ลบไฟล์จาก Cloudinary ทันที
- ห้ามส่ง Cloudinary Secret หรือ Credential สำหรับเขียนข้อมูลไปยัง Browser

### 4. Authentication และ Security

- มีเจ้าของระบบเพียงคนเดียว ไม่มี Registration, Forgot Password หรือหลาย Role
- Password ต้องถูก Hash ด้วย Argon2 ก่อนจัดเก็บ
- JWT ใช้ผ่าน `Secure`, `HttpOnly`, `SameSite=Lax` Cookie
- Browser เรียก API ผ่าน Same-origin `/api` proxy ของ Next.js ไปยัง NestJS
- Mutation ของ Admin ต้องตรวจ Origin/Referer และ CSRF Token
- Admin API ทุก Endpoint รวม Upload ต้องตรวจ Authentication
- Public API อ่านได้เฉพาะข้อมูล Public และ Projects ที่ `PUBLISHED`
- Public DTO ต้องไม่ส่ง Password, Owner ID, Cloudinary ID หรือข้อมูลภายในที่ไม่จำเป็น
- Secret, Database Credentials, JWT Secret และ Cloudinary Credentials ต้องอยู่ใน Environment Variables ฝั่ง Server

## โครงสร้างข้อมูลขั้นต่ำ

รายละเอียด Prisma Schema, Relations, Indexes และ Constraints อยู่ใน [Docs/db.md](Docs/db.md)

### Profile

`name`, `headline`, `bio`, `location`, `email`, `availableForOpportunities`, `avatarUrl`, `avatarAlt`, `avatarCloudinaryId`, `resumeUrl`, `resumeCloudinaryId`, `githubUrl`, `linkedinUrl`, `skills`, `experiences`

### Skill

`id`, `profileId`, `name`, `category`, `sortOrder`

### Experience

`id`, `profileId`, `title`, `organization`, `type`, `startDate`, `endDate`, `summary`, `highlights`, `sortOrder`

### Project

`id`, `profileId`, `title`, `slug`, `description`, `techStack`, `coverImageUrl`, `coverImageAlt`, `coverCloudinaryId`, `gallery`, `projectUrl`, `sourceUrl`, `status`, `sortOrder`, `createdAt`, `updatedAt`

โดย `status` มีค่า `DRAFT` หรือ `PUBLISHED`

## Tech Stack และ Runtime

| ส่วนงาน | เทคโนโลยี | การใช้งานหลัก |
|---|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui | Public One-page และ Admin CMS |
| Landing UI | Aceternity UI | ใช้เฉพาะ Visual Components เด่นบนหน้า Landing |
| Backend | NestJS, TypeScript, REST API, Swagger | API, Authentication และ Business Logic |
| Authentication | JWT, Argon2, Secure HttpOnly Cookie, CSRF Token | Login และป้องกัน Admin API |
| Database | PostgreSQL, Prisma ORM | จัดเก็บข้อมูล Portfolio และ Owner |
| Media Storage | Cloudinary | จัดเก็บรูปภาพและ Resume PDF |
| Development Tools | npm, Docker Compose, Git, Postman | Development, Environment และ API Testing |

ระบบแยกเป็น 2 Service:

- `frontend`: พอร์ต `3001`
- `backend`: พอร์ต `3000`
- `postgres`: พอร์ต `5432`

เป้าหมายรอบแรกคือ Local Docker ยังไม่รวม Production Deployment หรือ Cloud Provider Configuration

## API Contract

ทุก Endpoint ต้องบันทึกใน Swagger และใช้ NestJS standard error response เช่น `{ statusCode, message, error }` สำหรับ Error ทั่วไปและ Validation Error

### Public

#### `GET /portfolio`

ไม่ต้อง Authentication และใช้ `no-store` ใน Frontend

Response ต้องมีรูปแบบหลักดังนี้ และต้องไม่รวม Draft Project หรือ Internal Credential:

```json
{
  "profile": {
    "name": "Demo Developer",
    "headline": "Full Stack Developer",
    "bio": "...",
    "location": "Bangkok, Thailand",
    "availableForOpportunities": true,
    "email": "owner@example.com",
    "avatarUrl": null,
    "avatarAlt": null,
    "resumeUrl": null,
    "githubUrl": "https://github.com/example",
    "linkedinUrl": "https://linkedin.com/in/example"
  },
  "skills": [],
  "experiences": [],
  "projects": []
}
```

รูปแบบรายการใน Response:

```json
{
  "skill": { "id": "...", "name": "TypeScript", "category": "Frontend", "sortOrder": 1 },
  "experience": {
    "id": "...",
    "title": "Full Stack Developer",
    "organization": "Demo Company",
    "type": "Work",
    "startDate": "2024-01-01",
    "endDate": null,
    "summary": "...",
    "highlights": ["Designed REST APIs"],
    "sortOrder": 1
  },
  "project": {
    "id": "...",
    "title": "Portfolio API Demo",
    "slug": "portfolio-api-demo",
    "description": "...",
    "techStack": ["NestJS", "Prisma"],
    "coverImageUrl": null,
    "coverImageAlt": null,
    "projectUrl": null,
    "sourceUrl": null,
    "sortOrder": 1,
    "gallery": []
  }
}
```

Public Project response จะมีเฉพาะ Projects ที่ `PUBLISHED` และไม่จำเป็นต้องส่ง `status`; Admin Project response ต้องส่ง `status` เสมอ

### Authentication

#### `POST /auth/login`

Request:

```json
{ "email": "owner@example.com", "password": "secret" }
```

เมื่อสำเร็จให้ Set JWT Cookie และตอบ `{ "authenticated": true }` หากข้อมูลไม่ถูกต้องให้ตอบ `401` ด้วยข้อความทั่วไปที่ไม่บอกว่า Email มีอยู่หรือไม่

#### `POST /auth/logout`

ต้อง Authentication และ CSRF Token; ล้าง Session Cookie แล้วตอบ `{ "authenticated": false }`

#### `GET /auth/csrf`

ไม่ต้อง Authentication; สร้าง/คืน CSRF Token สำหรับ Frontend และห้ามเก็บ Token นี้ใน HttpOnly Cookie

### Admin Profile และ Dashboard

#### `GET /portfolio/admin/profile`

ต้อง Authentication; คืน `{ "data": { ...profile } }` สำหรับ Form รวม Internal Media IDs ที่จำเป็นต่อ Admin เท่านั้น

#### `PATCH /portfolio/admin/profile`

ต้อง Authentication และ CSRF Token; รับเฉพาะ Profile fields ที่แก้ไขได้ และคืน `{ "data": { ...profile } }` ที่บันทึกแล้ว

Request fields ที่รับได้: `name`, `headline`, `bio`, `location`, `email`, `availableForOpportunities`, `avatarUrl`, `avatarAlt`, `avatarCloudinaryId`, `resumeUrl`, `resumeCloudinaryId`, `githubUrl`, `linkedinUrl`

#### `GET /portfolio/admin/summary`

ต้อง Authentication; คืน `{ "data": { ...summary } }` ที่มีจำนวน `draftProjects`, `publishedProjects`, จำนวน Skills/Experiences และ `profileCompleteness` สำหรับ Dashboard เท่านั้น ไม่มี Analytics หรือ Chart

Response:

```json
{
  "data": {
    "draftProjects": 1,
    "publishedProjects": 2,
    "skills": 8,
    "experiences": 3,
    "profileCompleteness": 0.9
  }
}
```

### Admin Resources

ใช้รูปแบบ REST เดียวกันกับ Resources เหล่านี้:

- `/portfolio/admin/skills`
- `/portfolio/admin/experiences`
- `/portfolio/admin/projects`

แต่ละ Resource ต้องมี:

- `GET /resource` — อ่านรายการสำหรับ Admin
- `POST /resource` — สร้างรายการ
- `GET /resource/:id` — อ่านรายการเดียว
- `PATCH /resource/:id` — แก้ไขรายการ
- `DELETE /resource/:id` — ลบรายการถาวรจาก Database หลัง Confirm ใน UI
- `PATCH /resource/reorder` — รับ `{ "items": [{ "id": "...", "sortOrder": 1 }] }` และบันทึกลำดับแบบ Batch

ทุก Mutation ต้องใช้ Authentication และ CSRF Token

Request body หลัก:

- Skill: `{ "name": "TypeScript", "category": "Frontend", "sortOrder": 1 }`
- Experience: `{ "title": "...", "organization": "...", "type": "Work", "startDate": "2024-01-01", "endDate": null, "summary": "...", "highlights": [], "sortOrder": 1 }`
- Project: `{ "title": "...", "slug": "project-slug", "description": "...", "techStack": [], "coverImageUrl": null, "coverImageAlt": null, "coverCloudinaryId": null, "gallery": [], "projectUrl": null, "sourceUrl": null, "status": "DRAFT", "sortOrder": 1 }`

Create/Patch สำเร็จต้องคืน Resource ที่บันทึกแล้วในรูป `{ "data": { ... } }`; List สำเร็จต้องคืน `{ "data": [], "total": 0 }`

Project เพิ่มกฎดังนี้:

- `status` รับเฉพาะ `DRAFT` หรือ `PUBLISHED`
- Project ที่ `PUBLISHED` แก้ไขแล้วมีผล Public ทันที
- `slug` ต้องเป็น lowercase kebab-case และไม่ซ้ำ
- `projectUrl` และ `sourceUrl` ต้องเป็น HTTP(S) URL หรือว่าง

### Media

#### `POST /media/upload`

ต้อง Authentication และ CSRF Token ใช้ `multipart/form-data`:

- `file`: ไฟล์ที่ต้องการอัปโหลด
- `kind`: `avatar`, `cover`, `gallery` หรือ `resume`
- `projectId`: จำเป็นเมื่อ `kind=gallery`

Backend ต้องคืน `{ "data": { "url": "...", "publicId": "...", "kind": "cover" } }` สำหรับ Admin ใช้บันทึกต่อ และต้อง reject MIME/size ที่ไม่ตรงข้อกำหนด

## Validation Rules

- Required text fields ห้ามเป็นค่าว่างหลัง Trim
- Email ต้องผ่านรูปแบบ Email validation
- URL ทุก field รองรับเฉพาะ `http://` หรือ `https://` และ field ที่เป็น Optional สามารถเป็นค่าว่างได้
- Slug ต้องเป็น lowercase kebab-case และไม่ซ้ำ
- `sortOrder` ต้องเป็นจำนวนเต็มไม่ติดลบ
- Skill ที่อยู่ใน Profile เดียวกันต้องไม่ซ้ำโดยไม่สนใจตัวพิมพ์เล็ก/ใหญ่
- `endDate` เป็นค่าว่างได้และแสดงเป็น `Present`
- Alt Text ต้องมีสำหรับ Cover และ Gallery Image ที่ใช้เป็นเนื้อหา

## สิ่งที่ไม่รวมใน MVP

- สมัครสมาชิก, Forgot Password, Google/Facebook Login, หลายผู้ใช้ หรือหลาย Role
- Revision/Versioning ของ Profile หรือ Project
- Public Feed, User Search, Blog, Comment และ Project Detail Page
- Analytics, Chart และการเก็บสถิติผู้ชม
- Contact Form ที่จัดเก็บข้อความในระบบ
- หลายภาษาและ Language Switch
- Production Deployment, CDN policy และ Orphan Media Cleanup Job

## Acceptance Criteria

### Public

- ผู้ชมเปิด `/` แล้วเห็น Profile, Skills, Experience และ Projects ที่ Published ได้ครบ
- Public response ไม่มี Draft Project, Password, Owner ID หรือ Cloudinary ID ที่ไม่จำเป็น
- หน้าเว็บใช้งานได้บน Mobile/Desktop และไม่มี Horizontal Overflow
- Hero แสดง Availability เมื่อ `availableForOpportunities=true` เท่านั้น
- Gallery เปิด/ปิดด้วย Mouse และ Keyboard รองรับ Escape, Focus Trap และ Restore Focus
- Project/Skill/Experience แสดงตาม `sortOrder`
- แสดง Action Link เฉพาะ URL ที่มีข้อมูล
- มี SEO Metadata, Semantic HTML และ Alt Text

### Admin

- เจ้าของ Login/Logout ได้ และผู้ไม่ Login ถูกปฏิเสธจาก Admin API
- Dashboard แสดง Summary และ Quick Actions โดยไม่มี Analytics
- แก้ไข Profile, Skills, Experience และ Projects ได้โดยไม่แก้ Source Code
- Profile, Skills และ Experience Save แล้วเห็นผลบน Public ทันที
- Project Draft ไม่ปรากฏบน Public และ Publish/Unpublish ได้
- Project ที่ Published แก้ไขแล้วเห็นผล Public ทันที
- Reorder แบบ Batch มีผลบน Public
- Upload รูปและ PDF ผ่าน Backend ได้ตาม MIME/size limits
- ไม่มี Cloudinary Secret หรือ Credential สำคัญถูกส่งไป Browser
- Preview ไม่เรียก Public API และไม่ทำให้ Draft รั่ว

### Engineering QA

- Swagger ระบุ Request/Response/Auth ของทุก Endpoint
- มี Unit, API e2e และ Browser smoke tests ตาม Test Plan
- ตรวจ Login, Logout, CSRF, Unauthorized Access, CRUD, Reorder, Draft/Published และ Upload validation
- ผ่าน WCAG 2.2 AA checklist, Keyboard/Screen Reader ขั้นพื้นฐาน, Lighthouse Mobile และ Reduced Motion check

## Test Plan

### Unit Tests

- Argon2 password hashing และการตรวจ Login
- Public filtering ที่คืนเฉพาะ `PUBLISHED`
- DTO validation สำหรับ Email, URL, Slug, Sort Order และ Upload limits
- Batch reorder และการป้องกันข้อมูลข้าม Profile

### API E2E Tests

- Login, Logout, CSRF และ Unauthorized Admin access
- Profile, Skills, Experience และ Project CRUD
- Draft/Published, Published edit และ Public Read
- Batch reorder ของ Skills, Experiences และ Projects
- MIME/size validation ของรูปภาพและ Resume PDF

### Browser Smoke Tests

- Public responsive navigation และ Mobile Menu
- Admin Login → Dashboard → แก้ข้อมูล → เห็นผลบน Public
- Project Preview, Save Draft, Publish และ Unpublish
- Gallery Dialog: เปิด, ปิด, Escape, Focus Trap และ Restore Focus
- Keyboard navigation, Reduced Motion และไม่มี Horizontal Overflow

## Environment และการรันระบบ

ตัวแปรขั้นต่ำที่ต้องมีใน `.env` หรือ Environment ของ Service:

```env
POSTGRES_USER=portfolio
POSTGRES_PASSWORD=change-me
POSTGRES_DB=portfolio
DATABASE_URL=postgresql://portfolio:change-me@postgres:5432/portfolio
JWT_SECRET=change-me
BACKEND_URL=http://backend:3000
FRONTEND_URL=http://localhost:3001
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SEED_ADMIN_EMAIL=owner@example.com
SEED_ADMIN_PASSWORD=change-me
```

คำสั่งหลักสำหรับ Local Docker:

1. สร้าง `.env` จากตัวอย่างและเติม Cloudinary Credentials
2. รัน `docker compose up --build`
3. รัน Prisma Migration และ Seed ตามคำสั่งของ Backend Container
4. เปิด Public ที่ `http://localhost:3001/`
5. เปิด Admin ที่ `http://localhost:3001/admin`
6. เปิด Swagger ที่ `http://localhost:3000/docs`

รายละเอียดคำสั่ง migration, seed, test และ environment ต้องอัปเดตให้ตรงกับ scripts จริงเมื่อเริ่มสร้างโครงสร้างโปรเจกต์
