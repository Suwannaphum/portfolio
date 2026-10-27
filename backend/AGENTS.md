# Backend Agent Instructions

กติกานี้ใช้กับไฟล์ใต้ `backend/` และต้องใช้ร่วมกับ Root `AGENTS.md`

## Scope

- สร้าง NestJS REST API, Prisma data access และ Business Logic ตาม API Contract ใน `README.md`
- ใช้ PostgreSQL และ schema ที่กำหนดใน `Docs/db.md`
- ระบบมี Owner เพียงคนเดียว ไม่มี Registration, Forgot Password หรือหลาย Role

## Required Security

- Hash Password ด้วย Argon2 ก่อนจัดเก็บ
- ใช้ JWT ผ่าน `Secure`, `HttpOnly`, `SameSite=Lax` Cookie
- ทุก Admin endpoint และ Media upload ต้อง Authentication
- ทุก mutation ต้องตรวจ Origin/Referer และ CSRF Token
- Public DTO ห้ามส่ง Password, Owner ID, Cloudinary IDs หรือข้อมูลภายในที่ไม่จำเป็น
- Cloudinary Secret และ Database/JWT credentials ต้องอยู่ใน Environment Variables ฝั่ง Server

## API and Data

- ใช้ DTO validation และ NestJS standard error response
- Public `/portfolio` คืนเฉพาะ Published Projects และเรียงตาม `sortOrder`
- Profile, Skills และ Experience Save แล้วมีผล Public ทันที
- Project ที่ Published แก้แล้วมีผล Public ทันที ไม่มี Revision
- Reorder ใช้ Batch endpoint และทำงานใน transaction
- Schema change ต้องสร้าง migration ใหม่ ห้ามแก้ migration ที่ใช้งานแล้ว

## Media

- รับไฟล์ผ่าน Backend เท่านั้น
- รูป: JPEG/PNG/WebP ไม่เกิน 10MB
- Resume: PDF ไม่เกิน 20MB
- Gallery ไม่เกิน 10 รูปต่อ Project
- Remove ลบ Database reference ก่อน และไม่ลบ Cloudinary asset ทันที
