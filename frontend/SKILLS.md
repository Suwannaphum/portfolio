# Frontend Skills

## Public Portfolio

- แบ่ง UI ตาม Header, Hero, About/Skills, Work, Experience, Contact และ Footer
- รักษา Mobile reading order ก่อน Bento layout บน Desktop
- แสดง Action Link และ CTA เฉพาะเมื่อข้อมูลมีอยู่จริง
- ใช้ Empty, Loading, Error และ Missing-media states ที่ไม่ทำให้ Layout พัง

## Admin CMS

- ใช้ Form ที่มี Label, validation message และ save feedback ครบ
- แยก Dashboard Summary, Profile, Skills, Experience และ Projects ตาม scope
- ใช้ Batch reorder และมีปุ่ม Move Up/Move Down สำหรับ Keyboard
- แสดง Draft/Published เป็นข้อความคู่กับสีเสมอ

## Data and Security

- เรียก Backend ผ่าน `/api` proxy เท่านั้น
- ไม่เก็บ JWT, Cloudinary Secret หรือ Write Credential ใน browser storage/client bundle
- ใช้ DTO shape ตาม `README.md` และไม่แปลงข้อมูลเกินความจำเป็น
