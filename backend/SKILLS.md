# Backend Skills

## Modules

- `auth`: login, logout, CSRF และ session cookie
- `portfolio`: Public DTO, Profile และ Dashboard summary
- `skills`, `experience`, `projects`: CRUD และ batch reorder
- `media`: MIME/size validation และ Cloudinary upload
- `prisma`: schema, migration, seed และ transactions

## Validation Patterns

- Trim required text และ reject empty values
- Normalize Email เป็น lowercase
- รับ URL เฉพาะ HTTP(S)
- รับ Slug เป็น lowercase kebab-case และตรวจ uniqueness
- รับ `sortOrder` เป็น integer ที่ไม่ติดลบ
- ตรวจ `endDate >= startDate` เมื่อมี End Date
- ตรวจ ownership ของทุก Admin resource ก่อนอ่าน/แก้/ลบ

## Testing Patterns

- ทดสอบ Service logic แบบ unit โดย mock Prisma/Cloudinary
- ทดสอบ HTTP contract แบบ API e2e
- ครอบคลุม Unauthorized, CSRF, Draft filtering, CRUD, reorder และ upload limits
- ไม่ใช้ test fixture ที่ส่ง Secret จริงหรือ Password แบบ Plain Text
