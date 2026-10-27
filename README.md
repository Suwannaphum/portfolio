# Personal Portfolio — One-page + CMS

## ภาพรวมโครงการ

เว็บ Portfolio ส่วนตัวสำหรับเจ้าของคนเดียว ใช้หน้า Public แบบ One-page เพื่อแนะนำตัว นำเสนอประสบการณ์และผลงานให้ Recruiter หรือบริษัทเข้าชมได้ง่าย พร้อม Admin CMS สำหรับแก้ไขเนื้อหาโดยไม่ต้องแก้โค้ด

ระบบนี้ไม่ใช่แพลตฟอร์มสำหรับผู้ใช้หลายคน และไม่มี Public Feed หรือ User Search

## วัตถุประสงค์

- สร้างหน้า Portfolio ที่ดูเป็นมืออาชีพ โหลดเร็ว และใช้งานได้บนมือถือและ Desktop
- ให้เจ้าของจัดการ Profile, Skills, Experience และ Projects ผ่าน Admin CMS
- แยกข้อมูล Draft กับ Published เพื่อควบคุมสิ่งที่แสดงบนหน้า Public
- ฝึกพัฒนา Full Stack ด้วย Next.js, NestJS, REST API, Authentication และฐานข้อมูลเชิงสัมพันธ์

## กลุ่มผู้ใช้งาน

- **ผู้ชมทั่วไป:** ดู Portfolio และผลงานที่เผยแพร่แล้ว
- **เจ้าของ Portfolio:** เข้าสู่ระบบเพื่อจัดการข้อมูลผ่าน Admin CMS

## ขอบเขตฟีเจอร์ใน MVP

### 1. Public One-page Portfolio

หน้า Public ที่ `/` ต้องมี Sections ต่อไปนี้:

- **Hero:** ชื่อ, Headline, สถานที่หรือสถานะการทำงาน และปุ่มติดต่อ
- **About:** คำแนะนำตัวและ Skills
- **Experience:** ประสบการณ์การทำงานหรือการศึกษา
- **Selected Work:** รายการ Projects ที่มีสถานะ `Published`
- **Contact:** Email, Social Links และลิงก์ Resume ถ้ามี

รายละเอียด Project ที่แสดงได้:

- ชื่อผลงาน
- คำอธิบาย
- เทคโนโลยีที่ใช้
- Cover Image และ Gallery Images ถ้ามี
- Project URL และ Source URL ถ้ามี

หน้า Public ต้องรองรับ Responsive Design, SEO พื้นฐาน, Keyboard Navigation และข้อความ Alt ที่เหมาะสมสำหรับรูปภาพ

### 2. Admin CMS

เจ้าของ Portfolio สามารถ:

- Login ด้วย Email/Password
- แก้ไข Profile, Headline, Bio, Location, Email, Avatar, Resume และ Social Links
- เพิ่ม แก้ไข ลบ และจัดลำดับ Skills
- เพิ่ม แก้ไข ลบ และจัดลำดับ Experience
- สร้าง แก้ไข ลบ และจัดลำดับ Projects
- เปลี่ยนสถานะ Project ระหว่าง `Draft` และ `Published`
- อัปโหลด Cover Image และ Gallery Images
- ดูตัวอย่างข้อมูลที่กำลังจัดการก่อนเผยแพร่ได้ถ้าทำได้โดยไม่เพิ่มความซับซ้อนเกิน MVP

การแก้ไขข้อมูลใน CMS ต้องไม่ทำให้ต้องแก้ไข Source Code และข้อมูล Draft ต้องไม่แสดงบนหน้า Public

### 3. Media Management

- ใช้ Cloudinary สำหรับจัดเก็บ Avatar, Cover Image และ Gallery Images
- จำกัดประเภทไฟล์เป็นรูปภาพ
- จำกัดขนาดไฟล์ตามค่าที่กำหนดในระบบ
- ห้ามเปิดเผย Cloudinary Secret หรือ Token ที่ใช้เขียนข้อมูลในฝั่ง Browser

### 4. Authentication และ Security

- มีเจ้าของระบบเพียงคนเดียว
- ไม่มี User Registration และไม่มีระบบหลาย Role
- Password ต้องถูก Hash ด้วย Argon2 ก่อนจัดเก็บ
- ใช้ JWT ผ่าน Secure HttpOnly Cookie สำหรับ Admin Session
- Public API อ่านได้เฉพาะ Profile และ Projects ที่เผยแพร่แล้ว
- Admin API ต้องตรวจสอบ Authentication ก่อนอ่านหรือแก้ไขข้อมูล
- เก็บ Secret และ Database Credentials ผ่าน Environment Variables

## โครงสร้างข้อมูลขั้นต่ำ

### Profile

`name`, `headline`, `bio`, `location`, `email`, `avatarUrl`, `resumeUrl`, `githubUrl`, `linkedinUrl`, `skills`, `experience`

### Project

`title`, `slug`, `description`, `techStack`, `coverImageUrl`, `galleryUrls`, `projectUrl`, `sourceUrl`, `status`, `sortOrder`

โดย `status` มีค่า `Draft` หรือ `Published`

## Tech Stack

| ส่วนงาน | เทคโนโลยี | การใช้งานหลัก |
|---|---|---|
| Frontend | Next.js, TypeScript, Acertinity UI | Public One-page และ Admin CMS |
| Backend | NestJS, TypeScript, REST API, Swagger | API, Authentication และ Business Logic |
| Authentication | JWT, Argon2, HttpOnly Cookie | Login และป้องกัน Admin API |
| Database | PostgreSQL, Prisma ORM | จัดเก็บ Profile และ Projects |
| Media Storage | Cloudinary | จัดเก็บรูปภาพ |
| Development Tools | Git, GitHub, Docker, Postman | Version Control, Environment และ API Testing |

## API Behavior ขั้นต่ำ

- `GET /portfolio` — อ่านข้อมูล Public ที่เผยแพร่แล้ว
- `POST /auth/login` — Login เจ้าของระบบ
- `POST /auth/logout` — Logout
- `GET/PATCH /portfolio/admin/profile` — อ่านและแก้ไข Profile
- `GET/POST/PATCH/DELETE /portfolio/admin/projects` — จัดการ Projects
- `POST /media/upload` — อัปโหลดรูปภาพสำหรับ Admin

รายละเอียด Endpoint และ Request/Response ต้องบันทึกใน Swagger

## สิ่งที่ไม่รวมใน MVP

- สมัครสมาชิกและระบบหลายผู้ใช้
- Google Login และ Facebook Login
- Role หลายระดับและระบบเชิญผู้ดูแล
- Public Feed และ User Search
- Dashboard สถิติ, Chart และ Analytics
- Blog, Comment และระบบค้นหา Project
- หลายภาษา
- Project Detail Page แยกจากหน้า One-page
- Contact Form ที่มีการจัดเก็บข้อความในระบบ

## Acceptance Criteria

- ผู้ชมเปิด `/` แล้วเห็นข้อมูล Profile และ Projects ที่ Published ได้ครบ
- หน้าเว็บใช้งานได้บนมือถือและ Desktop
- เจ้าของ Login เข้า Admin CMS ได้ด้วย Email/Password
- เจ้าของแก้ไข Profile และ Projects ได้โดยไม่ต้องแก้ Source Code
- Project ที่เป็น Draft ไม่ปรากฏบนหน้า Public
- เจ้าของ Publish และ Unpublish Project ได้
- เจ้าของอัปโหลดรูปภาพและนำไปใช้กับ Project ได้
- การเรียงลำดับ Projects และ Skills มีผลบนหน้า Public
- ผู้ที่ไม่ได้ Login ไม่สามารถเรียกใช้ Admin API ได้
- ไม่มี Secret หรือ Credential สำคัญถูกส่งไปฝั่ง Browser
- มี Swagger Documentation และทดสอบกรณี Login, CRUD Project, Draft/Published และ Public Read

## การรันระบบสำหรับพัฒนา

1. เตรียม PostgreSQL และ Cloudinary Credentials ผ่าน Environment Variables
2. รัน Prisma Migration และ Seed สำหรับสร้างบัญชีเจ้าของระบบ
3. รัน Backend และ Frontend แยกกันในโหมด Development
4. เปิดหน้า Public ที่ `/` และ Admin CMS ที่ `/admin`

รายละเอียดค่า Environment Variables และคำสั่งรันจริงต้องเพิ่มเมื่อเริ่มวางโครงสร้างโปรเจกต์
