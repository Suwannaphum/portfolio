# Agent Instructions

กติกานี้ใช้กับทุกงานใน repository นี้ และต้องอ่านก่อนเริ่มแก้ไฟล์

## Source of Truth

- อ่าน `README.md`, `Docs/db.md` และ `Docs/ux-ui.md` ก่อนวางแผนงาน
- Requirement และ Acceptance Criteria เป็นขอบเขตบังคับของงาน
- เมื่อเอกสารขัดกัน ให้หยุดตรวจสอบและถามผู้ใช้ก่อนเลือกพฤติกรรม
- ห้ามเพิ่ม Feature, Dependency, Service หรือ Architecture ที่ Requirement ไม่ต้องการ

## Working Style

- ใช้ Ponytail ทุกครั้ง: ทำการเปลี่ยนแปลงที่เล็กที่สุดที่แก้ปัญหาได้ครบ
- อ่าน caller, test, config และ fixture ที่เกี่ยวข้องก่อนแก้โค้ด
- รักษา validation, security, accessibility และ error handling ที่ Requirement ระบุ
- อย่าแก้ไฟล์หรือการเปลี่ยนแปลงของผู้ใช้ที่ไม่เกี่ยวข้อง
- งานที่มี branch/loop/parser/security/data mutation ต้องมี test หรือ self-check ที่เหมาะสม

## Git Workflow

1. สำรวจ repository และวางแผนก่อนแก้ไฟล์
2. สร้าง branch ใหม่จาก `develop` ก่อน mutation ทุกหัวข้อใหม่
3. ใช้ชื่อ branch แบบ `feat/<kebab-case>`, `fix/<kebab-case>` หรือ `chore/<kebab-case>`
4. ทำงานหนึ่งหัวข้อต่อหนึ่ง branch และห้าม commit ตรง `develop`
5. ตรวจ diff, tests และ checks ก่อน commit
6. Commit ด้วยข้อความสั้นที่อธิบายผลลัพธ์
7. Push branch และเปิด Pull Request ไปยัง `develop`
8. ไม่ merge หรือ delete branch อัตโนมัติ

หากเปิด PR อัตโนมัติไม่ได้ ให้ push branch และส่ง GitHub Compare URL แทน

## Completion

ก่อนรายงานว่างานเสร็จ ต้องระบุ:

- ไฟล์/พฤติกรรมที่เปลี่ยน
- Tests/checks ที่รันและผลลัพธ์
- สิ่งที่ยังไม่ได้ตรวจและความเสี่ยง
- Commit และ branch ที่เกี่ยวข้องเมื่อมีการแก้ไฟล์

กติกาเฉพาะพื้นที่ใน `frontend/`, `backend/` และ `qa/` ใช้เพิ่มเติมจากไฟล์นี้ ไม่ได้แทนที่กติกาหลัก
